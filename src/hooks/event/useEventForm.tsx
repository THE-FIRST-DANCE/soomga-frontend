import { useState, useCallback } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addEvent, updateEvent } from 'api/EventAPI'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { EventData } from 'interfaces/event'
import { Plans } from 'interfaces/plan'

interface EventModalProps {
  onRequestClose: () => void
  editEvent?: EventData
  selectedDate: Date
}

export const useEventModal = ({ onRequestClose, editEvent, selectedDate }: EventModalProps) => {
  const [title, setTitle] = useState<string>(editEvent?.title || '')
  const [allDay, setAllDay] = useState<boolean>(editEvent?.allDay || false)
  const [startDate, setStartDate] = useState<Date>(selectedDate)
  const [endDate, setEndDate] = useState<Date>(editEvent?.end || selectedDate)
  const [setDesc, setSetDesc] = useState<boolean>(editEvent?.description ? true : false)
  const [description, setDescription] = useState<string>(editEvent?.description || '')
  const [startTime, setStartTime] = useState<string>(editEvent ? format(editEvent.start, 'HH:mm') : '00:00')
  const [endTime, setEndTime] = useState<string>(editEvent ? format(editEvent.end, 'HH:mm') : '23:30')

  const [plans, setPlans] = useState<Plans[]>([])
  const [openPlanList, setOpenPlanList] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState<Plans>()

  const toggleSetDesc = useCallback(() => {
    setSetDesc((prev) => !prev)
  }, [])

  const queryClient = useQueryClient()

  const { mutate: addMutate } = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      onRequestClose()
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      onRequestClose()
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const onEventAddHandler = useCallback(() => {
    if (!allDay) {
      startTime > endTime &&
        toast.error('시작 시간이 종료 시간보다 늦을 수 없습니다.', {
          position: 'top-center',
          closeOnClick: true,
          pauseOnHover: true,
          style: {
            fontSize: '0.9rem',
          },
        })
    }

    if (selectedPlan) {
      const start = Number(format(startDate, 'MMdd'))
      const end = Number(format(endDate, 'MMdd'))

      if (end < start) {
        const endOfYear = Number(format(endDate, 'yyyy')) + 1
        const endOfMonth = Number(format(endDate, 'MM'))
        const endOfMonthDays = new Date(endOfYear, endOfMonth, 0).getDate()
        const endDay = endOfMonthDays - start + end + 1

        if (selectedPlan.period > endDay) {
          toast.error('플랜 기간이 더 깁니다', {
            position: 'top-center',
            closeOnClick: true,
            pauseOnHover: true,
          })
          return
        }
      } else {
        if (selectedPlan.period > end - start + 1) {
          toast.error('플랜 기간이 더 깁니다', {
            position: 'top-center',
            closeOnClick: true,
            pauseOnHover: true,
          })
          return
        }
      }
    }

    const formatStart = format(startDate, 'yyyy-MM-dd') + 'T' + startTime
    const formatEnd = format(endDate, 'yyyy-MM-dd') + 'T' + endTime

    const data = {
      memberId: 2, // TODO: 로그인 정보로 대체
      title,
      start: formatStart,
      end: formatEnd,
      allDay,
      description,
      planId: selectedPlan?.id,
    }

    if (editEvent) {
      updateMutate({ id: editEvent.id, data })
      return
    }

    addMutate(data)
  }, [title, allDay, startDate, endDate, setDesc, description, startTime, endTime, selectedPlan, editEvent])

  return {
    title,
    setTitle,
    allDay,
    setAllDay,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setDesc,
    description,
    setDescription,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    onEventAddHandler,
    plans,
    setPlans,
    openPlanList,
    setOpenPlanList,
    selectedPlan,
    setSelectedPlan,
    toggleSetDesc,
  }
}

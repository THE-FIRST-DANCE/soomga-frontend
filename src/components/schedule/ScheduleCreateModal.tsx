import Modal from 'components/shared/Modal'
import styled from 'styled-components'
import { memo, useCallback, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import Check from 'components/icons/Check'
import Cancel from 'components/icons/Cancel'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addEvent, updateEvent } from 'api/EventAPI'
import { EventData } from 'interfaces/event'
import DescriptionEditor from './DescriptionEditor'
import TimeSectionComponent from './TimeSection'
import { format } from 'date-fns'

interface EventModalProps {
  isOpen: boolean
  onRequestClose: () => void
  editEvent?: EventData
  selectedDate: Date
}

const CreateEventModal = ({ isOpen, onRequestClose, editEvent, selectedDate }: EventModalProps) => {
  const [title, setTitle] = useState<string>(editEvent?.title || '')
  const [allDay, setAllDay] = useState<boolean>(editEvent?.allDay || false)
  const [startDate, setStartDate] = useState<Date>(selectedDate)
  const [endDate, setEndDate] = useState<Date>(editEvent?.end || selectedDate)
  const [setDesc, setSetDesc] = useState<boolean>(editEvent?.description ? true : false)
  const [description, setDescription] = useState<string>(editEvent?.description || '')
  const [startTime, setStartTime] = useState<string>(editEvent ? format(editEvent.start, 'HH:mm') : '00:00')
  const [endTime, setEndTime] = useState<string>(editEvent ? format(editEvent.end, 'HH:mm') : '23:30')

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

  const onEventAddHandler = () => {
    if (!allDay) {
      startTime > endTime && alert('시작 시간이 종료 시간보다 늦습니다.')
    }

    const data = {
      memberId: 1, // TODO: 로그인 정보로 대체
      title,
      start: format(startDate, 'yyyy-MM-dd') + 'T' + startTime,
      end: format(endDate, 'yyyy-MM-dd') + 'T' + endTime,
      allDay,
      description,
    }

    if (editEvent) {
      updateMutate({ id: editEvent.id, data })
      return
    }

    addMutate(data)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{
        content: {
          width: 'fit-content',
        },
      }}
    >
      <EventModalContainer>
        {/* 헤더 */}
        <ModalHeader>
          <ModalClose onClick={onRequestClose}>
            <Cancel style={{ width: '1.5rem', height: '1.5rem' }} />
          </ModalClose>
        </ModalHeader>

        {/* 타이틀 입력 */}
        <EventModalTitle>
          <EventModalInput
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </EventModalTitle>

        {/* 바디 */}
        <EventModalBody>
          {/* 시간 설정 */}
          <TimeSection>
            {/* 시간, 날짜 설정 */}
            <TimeSectionComponent
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              allDay={allDay}
              setAllDay={setAllDay}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          </TimeSection>

          {/* 설명 입력 */}
          <IconText>
            <EventIcon>
              <Check style={{ width: '1rem', height: '1rem' }} />
            </EventIcon>
            {setDesc ? (
              <DescriptionEditor value={description} onChange={setDescription} />
            ) : (
              <ClickItem onClick={toggleSetDesc}>Description</ClickItem>
            )}
          </IconText>

          {/* 플랜 등록 */}
          <IconText>
            <EventIcon>
              <Check style={{ width: '1rem', height: '1rem' }} />
            </EventIcon>
            <ClickItem>플랜</ClickItem>
          </IconText>
        </EventModalBody>

        {/* 저장 */}
        <Footer>
          <SaveButton onClick={onEventAddHandler}>Save</SaveButton>
        </Footer>
      </EventModalContainer>
    </Modal>
  )
}

export default memo(CreateEventModal)

const EventModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 2rem 3rem;
  border-radius: 10px;
`

const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  background-color: var(--bs-gray-200);
`

const ModalClose = styled.div`
  cursor: pointer;
`

const EventModalTitle = styled.div`
  display: flex;
  flex: 1 1 auto;
  margin: 0 16px;
  padding: 8px 0 0 52px;
  margin-top: 1rem;
`

const EventModalInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ced4da;
  font-size: 1.2em;
  transition: border-bottom 0.3s;

  &:focus {
    outline: none;
    border-bottom: 2px solid #007bff;
  }
`

const EventModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 2rem 0;
`

const TimeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const IconText = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  margin: 0 10px;
  position: relative;
`

const EventIcon = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 6px;
`

const ClickItem = styled.div`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  margin: 0 10px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9ecef;
  }
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`

const SaveButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--bs-gray-400);
  }
`

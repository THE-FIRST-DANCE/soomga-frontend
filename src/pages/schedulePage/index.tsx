import styled from 'styled-components'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import CustomToolbar from 'components/schedule/CustomToolbar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { memo, useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import CreateEventModal from 'components/schedule/ScheduleCreateModal'
import ScheduleCreateModal from 'components/schedule/ScheduleCreateModal'
import { getEvent } from 'api/EventAPI'
import { EventData } from 'interfaces/event'
import ScheduleDetailModal from 'components/schedule/ScheduleDetailModal'

interface DateCellWrapperProps {
  children: React.ReactNode
  value: Date
}

const DateCellWrapper = memo(({ children, value }: DateCellWrapperProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleAddEvent = useCallback(() => {
    setSelectedDate(value)
    setOpen(true)
  }, [])

  // 모달 닫기 핸들러
  const onRequestClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <DateCellContainer>
      {children}

      <DateCellButton onClick={handleAddEvent}>+ 일정 생성</DateCellButton>

      {open && (
        <CreateEventModal selectedDate={selectedDate || new Date()} isOpen={open} onRequestClose={onRequestClose} />
      )}
    </DateCellContainer>
  )
})

const DateCellButton = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 80%;
  border: 1px solid var(--bs-gray-300);
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  text-align: center;
  color: var(--bs-info);
  cursor: pointer;
  visibility: hidden;

  &:hover {
    background-color: var(--bs-gray-100);
  }
`

const DateCellContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-left: 1px solid var(--bs-gray-300);

  :first-child {
    border-left: none;
  }

  &:hover {
    ${DateCellButton} {
      visibility: visible;
    }
  }
`

const SchedulePage = () => {
  const localizer = momentLocalizer(moment)
  const [open, setOpen] = useState<boolean>(false)
  const [detailOpen, setDetailOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<EventData | undefined>(undefined)
  const [events, setEvents] = useState<EventData[]>([])

  const { data } = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvent(1),
  })

  useEffect(() => {
    if (data) {
      setEvents(data)
    }
  }, [data])

  const transformedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }))

  const editMode = (event: EventData) => {
    setDetailOpen(false)
    setSelectedItem(event)
    setOpen(true)
  }

  return (
    <Container>
      {/* 헤더 */}
      <Header></Header>

      {/* 캘린더 */}
      <CalendarContainer>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={transformedEvents}
          onSelectEvent={(event) => {
            setSelectedItem(event)
            setDetailOpen(true)
          }}
          components={{
            toolbar: CustomToolbar,
            dateCellWrapper: DateCellWrapper,
          }}
          style={{ position: 'relative' }}
        />
        {detailOpen && (
          <ScheduleDetailModal
            event={selectedItem}
            editMode={editMode}
            isOpen={detailOpen}
            onRequestClose={() => setDetailOpen(false)}
          />
        )}
      </CalendarContainer>

      {/* 일정 생성 모달 */}
      {open && (
        <ScheduleCreateModal
          editEvent={selectedItem}
          selectedDate={selectedItem?.start || new Date()}
          isOpen={open}
          onRequestClose={() => setOpen(false)}
        />
      )}

      {/* 일정 상세 모달 */}
    </Container>
  )
}

export default SchedulePage

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    display: none;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3rem;
  border-bottom: 1px solid var(--bs-gray-500);
  box-sizing: border-box;
`

const CalendarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 10rem;

  .rbc-header {
    padding: 0.5rem 0;
    border-left: none;

    .rbc-button-link {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
  }

  .rbc-month-view {
    min-height: 80rem;
    min-width: 20rem;
    border: 1px solid var(--bs-gray-200);

    .rbc-day-bg {
      background-color: var(--bs-white);
    }

    .rbc-date-cell {
      text-align: left;
      padding: 0.2rem;
    }

    .rbc-event {
      background-color: var(--bs-white);
      color: var(--bs-gray-800);
      padding: 0.5rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;

      ::before {
        position: absolute;
        content: '';
        height: 80%;
        width: 4px;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 0.5rem;
        display: block;
        clear: both;
        background-color: var(--color-primary);
      }
    }
  }

  .rbc-time-view {
    .rbc-time-slot {
      padding: 5px 0;
    }

    .rbc-events-container {
      margin-right: 0;
    }

    .rbc-event {
      border-radius: 0.5rem;
      padding: 0.5rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      background-color: var(--color-primary);
      color: var(--bs-gray-800);

      .rbc-event-label {
        font-size: 0.8rem;
        font-weight: bold;
      }

      .rbc-event-content {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .rbc-row-segment {
    padding: 5px;
    position: relative;
  }
`

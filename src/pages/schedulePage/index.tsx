import styled from 'styled-components'
import { Calendar, View, NavigateAction, Navigate, momentLocalizer } from 'react-big-calendar'
import { Calendar as CalendarComponent, OnArgs } from 'react-calendar'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import Arrow from 'components/icons/Arrow'
import { useState } from 'react'

const testEvnets = [
  {
    title: 'test1',
    start: new Date(2024, 2, 5),
    end: new Date(2024, 2, 6),
  },
  {
    title: 'test2',
    start: new Date(2024, 2, 6),
    end: new Date(2024, 2, 7),
  },
  {
    title: 'test3',
    start: new Date(2024, 2, 7),
    end: new Date(2024, 2, 9),
  },
]

interface CustomToolbarProps {
  label: string
  onNavigate: (action: NavigateAction, newDate?: Date) => void
  onView: (view: View) => void
  view: View
}

const CustomToolbar = ({ label, onNavigate, onView, view }: CustomToolbarProps) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <ToolbarContainer>
      <Tool>
        <TodayButton onClick={() => onNavigate(Navigate.TODAY)}>Today</TodayButton>
      </Tool>

      <DayText>
        {label}
        <div style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
          <Arrow $width="1.5rem" $height="1.5rem" $angle="90deg" />
        </div>

        {open && (
          <DaySelect>
            <SetDateCalendar setOpen={setOpen} date={new Date(label)} onNavigate={onNavigate} />
          </DaySelect>
        )}
      </DayText>

      <Tool
        style={{
          justifyContent: 'flex-end',
          gap: '1rem',
        }}
      >
        <FilterSelect className={view === 'month' ? 'active' : ''} onClick={() => onView('month')}>
          Month
        </FilterSelect>
        <FilterSelect className={view === 'week' ? 'active' : ''} onClick={() => onView('week')}>
          Week
        </FilterSelect>
      </Tool>
    </ToolbarContainer>
  )
}

const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  width: 100%;
`

const TodayButton = styled.button`
  background-color: transparent;
  color: var(--bs-info);
  border: none;
  font-size: 1rem;
  cursor: pointer;
`

const DaySelect = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.5rem;
  z-index: 100;
`

const DayText = styled.div`
  position: relative;
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const Tool = styled.div`
  display: flex;
  flex: 1;
`

const FilterSelect = styled.button`
  background-color: transparent;
  color: var(--bs-gray-800);
  border: 1px solid var(--bs-gray-300);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border-radius: 0.5rem;
  transition: 0.3s;

  &:hover {
    background-color: var(--bs-gray-100);
  }

  &.active {
    background-color: var(--color-primary);
    color: var(--bs-gray-dark);
    border: 1px solid var(--bs-black);
  }
`

interface SetDateCalendarProps {
  onNavigate: (action: NavigateAction, newDate: Date) => void
  date: Date
  setOpen: (open: boolean) => void
}

const SetDateCalendar = ({ onNavigate, date, setOpen }: SetDateCalendarProps) => {
  const [view, setView] = useState<'month' | 'year' | 'decade' | 'century'>('year')

  const onViewChange = ({ action, activeStartDate, view }: OnArgs) => {
    if (action === 'drillDown' && view === 'month') {
      onNavigate(Navigate.DATE, activeStartDate as Date)
      setOpen(false)
      return
    }

    setView(view)
  }

  return (
    <SetDateCalendarContainer>
      <CalendarComponent
        locale="ko"
        value={date}
        view={view}
        onViewChange={onViewChange}
        next2Label={null}
        prev2Label={null}
      />
    </SetDateCalendarContainer>
  )
}

const SetDateCalendarContainer = styled.div`
  .react-calendar {
    border: 1px solid var(--bs-gray-300);
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 20rem;
  }

  .react-calendar__year-view__months {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 1rem 0.5rem;

    font-weight: 400;
  }
`

interface DateCellWrapperProps {
  children: React.ReactNode
  value: Date
}

const DateCellWrapper = ({ children, value }: DateCellWrapperProps) => {
  const handleAddEvent = () => {
    // 일정 생성 로직
    console.log(`일정 생성: ${value}`)
  }

  return (
    <DateCellContainer>
      {children}

      <DateCellButton onClick={handleAddEvent}>+ 일정 생성</DateCellButton>
    </DateCellContainer>
  )
}

const DateCellButton = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 10rem;
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
          events={testEvnets}
          components={{
            toolbar: CustomToolbar,
            dateCellWrapper: DateCellWrapper,
          }}
        />
      </CalendarContainer>
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
  }

  .rbc-month-view {
    min-height: 100rem;
    min-width: 20rem;
    border: 1px solid var(--bs-gray-200);

    .rbc-day-bg {
      background-color: var(--bs-white);
    }

    .rbc-date-cell {
      text-align: left;
      padding: 0.2rem;
    }
  }

  .rbc-time-view {
    .rbc-time-slot {
      padding: 5px 0;
    }
  }
`

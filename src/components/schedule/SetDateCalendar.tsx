import { useState } from 'react'
import { Navigate, NavigateAction } from 'react-big-calendar'
import styled from 'styled-components'
import { Calendar as CalendarComponent, OnArgs } from 'react-calendar'

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

export default SetDateCalendar

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

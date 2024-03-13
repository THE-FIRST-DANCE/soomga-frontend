import Arrow from 'components/icons/Arrow'
import { memo, useCallback, useState } from 'react'
import { Navigate, NavigateAction, View } from 'react-big-calendar'
import styled from 'styled-components'
import SetDateCalendar from './SetDateCalendar'

interface CustomToolbarProps {
  label: string
  onNavigate: (action: NavigateAction, newDate?: Date) => void
  onView: (view: View) => void
  view: View
}

const CustomToolbar = memo(({ label, onNavigate, onView, view }: CustomToolbarProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [])

  return (
    <ToolbarContainer>
      <Tool>
        <TodayButton onClick={() => onNavigate(Navigate.TODAY)}>Today</TodayButton>
      </Tool>

      <DayText>
        {label}
        {view === 'month' ? (
          <div style={{ cursor: 'pointer' }} onClick={toggleOpen}>
            <Arrow $width="1.5rem" $height="1.5rem" $angle="90deg" />
          </div>
        ) : (
          <DateCellButton>
            <div style={{ cursor: 'pointer' }} onClick={() => onNavigate(Navigate.PREVIOUS)}>
              <Arrow $width="1.5rem" $height="1.5rem" $angle="180deg" />
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => onNavigate(Navigate.NEXT)}>
              <Arrow $width="1.5rem" $height="1.5rem" />
            </div>
          </DateCellButton>
        )}

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
})

export default CustomToolbar

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

const DateCellButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

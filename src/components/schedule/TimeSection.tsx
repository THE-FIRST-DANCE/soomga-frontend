import { memo, useState } from 'react'
import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Time from 'components/icons/Time'
import { format } from 'date-fns'
import { TimeSlots24 } from 'utils/timeSlots'

interface TimeSectionProps {
  allDay: boolean
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  setStartTime: (time: string) => void
  setEndTime: (time: string) => void
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  setAllDay: (allDay: boolean) => void
}

const TimeSectionComponent = memo(
  ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    allDay,
    setAllDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
  }: TimeSectionProps) => {
    const [startDateOpen, setStartDateOpen] = useState<boolean>(false)
    const [endDateOpen, setEndDateOpen] = useState<boolean>(false)
    const [openStartTime, setOpenStartTime] = useState<boolean>(false)
    const [openEndTime, setOpenEndTime] = useState<boolean>(false)

    const formatDateString = (date: Date) => {
      return format(date, 'yyyy-MM-dd')
    }

    return (
      <>
        <IconText>
          <EventIcon>
            <Time $width="1rem" $height="1rem" />
          </EventIcon>

          <ClickItem onClick={() => setStartDateOpen(!startDateOpen)}>
            {formatDateString(startDate)}
            {startDateOpen && (
              <DateDropdown>
                <ReactDatePicker
                  selected={startDate}
                  shouldCloseOnSelect={false}
                  onChange={(date) => {
                    setStartDate(date as Date)
                    setStartDateOpen(false)
                  }}
                  inline
                  calendarClassName="calendar"
                />
              </DateDropdown>
            )}
          </ClickItem>

          {allDay ? (
            <ClickItem onClick={() => setEndDateOpen(!endDateOpen)}>
              {formatDateString(endDate)}
              {endDateOpen && (
                <DateDropdown>
                  <ReactDatePicker
                    selected={endDate}
                    shouldCloseOnSelect={false}
                    onChange={(date) => {
                      setEndDate(date as Date)
                      setEndDateOpen(false)
                    }}
                    inline
                    calendarClassName="calendar"
                  />
                </DateDropdown>
              )}
            </ClickItem>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <ClickTime onClick={() => setOpenStartTime(!openStartTime)}>
                {startTime}
                {openStartTime && (
                  <DateDropdown>
                    {TimeSlots24.map((time, index) => (
                      <TimeDropdownText
                        onClick={() => {
                          setStartTime(time)
                          setOpenStartTime(false)
                        }}
                        key={index}
                      >
                        {time}
                      </TimeDropdownText>
                    ))}
                  </DateDropdown>
                )}
              </ClickTime>
              <div>-</div>
              <ClickTime onClick={() => setOpenEndTime(!openEndTime)}>
                {endTime}
                {openEndTime && (
                  <DateDropdown>
                    {TimeSlots24.map((time, index) => (
                      <TimeDropdownText
                        onClick={() => {
                          setEndTime(time)
                          setOpenEndTime(false)
                        }}
                        key={index}
                      >
                        {time}
                      </TimeDropdownText>
                    ))}
                  </DateDropdown>
                )}
              </ClickTime>
            </div>
          )}
        </IconText>

        <NotIconText>
          <input type="checkbox" id="allDay" checked={allDay} onChange={() => setAllDay(!allDay)} />
          <label htmlFor="allDay">All Day</label>
        </NotIconText>
      </>
    )
  },
)

export default TimeSectionComponent

const IconText = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  margin: 0 10px;
  position: relative;
`

const NotIconText = styled.div`
  margin: 0 10px;
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  margin-left: 4rem;
  gap: 10px;
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
  min-width: 6rem;
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

const ClickTime = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
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

const DateDropdown = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  height: 15rem;
  overflow-y: auto;
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 100;

  ::-webkit-scrollbar {
    display: none;
  }
`

const TimeDropdownText = styled.div`
  padding: 10px 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9ecef;
  }
`

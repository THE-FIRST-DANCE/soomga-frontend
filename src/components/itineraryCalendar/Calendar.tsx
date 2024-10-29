// import { MiddleLayout, Title } from 'pages/guide/detail'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs'

import { Title } from 'pages/guide/detail'

import { targetDates } from '../../pages/itinerary/index'
import { useRecoilState } from 'recoil'
import { MonthAtom } from 'state/store/MonthAtom'

// import { targetDates } from
type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

// 특정 날짜
// const targetDates = [new Date(2024, 2, 2), new Date(2024, 2, 5), new Date(2024, 2, 10), new Date(2024, 2, 15)]
// export const targetDates = [
//   { id: 1, name: '와다 사야카', date: new Date(2024, 2, 2) },
//   { id: 2, name: '오바 호노카', date: new Date(2024, 2, 5) },
//   { id: 2, name: '야마츠 아스카', date: new Date(2024, 2, 10) },
// ]

const CalendarComponent = () => {
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (
      view === 'month' &&
      targetDates.some(
        (targetDate: { id: number; name: string; date: Date }) => date.getTime() === targetDate.date.getTime(),
      )
    ) {
      return <CustomDot />
    }
    return null
  }

  const [value, onChange] = useState<Value>(new Date())
  const [month, setMonth] = useRecoilState(MonthAtom)

  useEffect(() => {
    const selectedDate = value as Date
    const selectedMonth = dayjs(selectedDate).format('M')
    if (month.month !== selectedMonth) {
      setMonth({ month: selectedMonth })
    }
  }, [value, month.month, setMonth]) // value가 변경될 때마다 실행

  return (
    <BookingCheckLayout>
      <Title>현재 예약 일정</Title>
      <BookingContainer>
        <CalendarWrapper>
          <Calendar
            onClickDay={(e: any) => {
              console.log(dayjs(e).format('YYYY MM. DD'))
            }}
            className="react-calendar"
            onChange={(date) => {
              onChange(date) // 상태 업데이트
            }}
            value={value}
            calendarType="gregory"
            formatDay={(locale, date: Date) => dayjs(date).format('D')}
            formatMonthYear={(locale, date: Date) => dayjs(date).format('YYYY년 M월')}
            tileContent={tileContent} // tileContent 적용
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false}
          />
        </CalendarWrapper>
      </BookingContainer>
    </BookingCheckLayout>
  )
}

export default CalendarComponent

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const CustomDot = styled.div`
  width: 0.3rem;
  height: 0.3rem;
  /* width: 0.4rem;
  height: 0.4rem; */
  background-color: var(--color-original);
  border-radius: 50%;
  position: absolute;
  /* top: 10px; */
  bottom: 10px;
  margin: 0 auto;
  position: absolute;
`
const MiddleLayout = styled.div`
  /* background-color: #fdd049; */
  /* height: 100%; */
  width: 90%;
  /* padding: 3rem 3rem; */
  /* box-sizing: border-box; */
  /* margin-bottom: 3rem; */
  /* position: relative; */
`
// 3. 현재 예약 일정
const BookingCheckLayout = styled(MiddleLayout)`
  /* background-color: mediumseagreen; */
  /* height: auto; */
`
const BookingContainer = styled(FlexCenterd)`
  /* background-color: #6ff178; */
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
`
const CalendarWrapper = styled(FlexCenterd)`
  /* width: 100%; */
  /* height: 34rem; */
  /* background-color: mediumaquamarine; */

  /* 달력 */
  .react-calendar {
    width: 25rem;
    height: 25rem;
    /* width: 100%;
    height: 110%; */
    font-size: 3rem;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 30px;

    /* 년도  */
    .react-calendar__navigation button {
      color: #000000;
      min-width: 93px;
      background: none;
      font-size: 1rem;
      /* margin-top: 1rem; */
    }

    // 월 높이 조절
    .react-calendar__month-view__weekdays {
      /* width: 5rem; */
      height: 3.3rem;
    }

    /* 일자 조절  */
    .react-calendar__tile {
      /* background-color: royalblue; */
      width: 3rem;
      height: 3rem;
      position: relative;
    }

    .react-calendar_ .react-calendar__navigation button:hover {
      background-color: transparent;
    }
    .react-calendar__navigation button:active {
      background-color: transparent;
    }

    /* 오늘 날짜 */
    .react-calendar__tile--now {
      background: #e44921;
      border: 0.2rem solid #2a2a2a;
      font-weight: bold;
      color: white !important;
      border-radius: 50%;
      z-index: 5;
      box-shadow: 3px 3px 3px 3px #7b7979;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    /* 일 날짜 색깔 */
    .react-calendar__tile {
      color: black;
      font-size: 0.7rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    // 요일 아래 밑줄 제거
    .react-calendar__month-view__weekdays abbr {
      text-decoration: none;
    }

    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
      background: #e44921;
    }

    // 날짜 눌럿을 때
    .react-calendar__tile--active {
      background: #e44921;
      border-radius: 50%;
      /* color: mediumaquamarine; */
      box-shadow: 3px 3px 3px 3px #7b7979;
    }

    .react-calendar__tile:hover {
      background: #e44921;
      border-radius: 50%; /* 또는 다른 값으로 조절 가능 */
      color: black; /* 글자 색깔 조절 가능 */
    }

    //현재 누른색
    .react-calendar__tile {
      /* background-color: #fff; */
    }

    /* 요일 라벨 */
    .react-calendar__month-view__weekdays {
      text-align: center;
      font-size: 0.8rem;
      background-color: #fff;
      border-bottom: 1px solid black;
      margin-top: -3.6rem;
    }
  }
`

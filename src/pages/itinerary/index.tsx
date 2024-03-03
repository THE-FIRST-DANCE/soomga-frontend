import CalendarComponent from 'components/itineraryCalendar/Calendar'
import ScheduleList from 'components/itineraryCalendar/ScheduleList'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { MonthAtom } from 'recoil/MonthAtom'
import { styled } from 'styled-components'

const datas = [
  {
    id: 1,
    date: '2024 1월 6일',
    name: '야마츠 아스카',
  },
  {
    id: 2,
    date: '2024 1월 6일',
    name: '야마츠 아스카',
  },
  {
    id: 2,
    date: '2024 1월 6일',
    name: '야마츠 아스카',
  },
]
export const targetDates: { id: number; name: string; date: Date }[] = [
  { id: 1, name: '와다 사야카', date: new Date(2024, 3 - 1, 2) },
  { id: 2, name: '오바 호노카', date: new Date(2024, 3 - 1, 5) },
  { id: 2, name: '야마츠 아스카', date: new Date(2024, 3 - 1, 10) },
  { id: 2, name: '이재일', date: new Date(2024, 4 - 1, 10) },
]

const ItineraryPage = () => {
  const [month, setMonth] = useRecoilState(MonthAtom)
  // console.log('month: ', typeof month.month)

  const [filteredDates, setFilteredDates] = useState<{ id: number; name: string; date: Date }[]>([])

  useEffect(() => {
    const filtered = targetDates.filter((data) => {
      const MatchedMonth = moment(data.date).format('M')
      return month.month === MatchedMonth
    })
    setFilteredDates(filtered)
  }, [month])

  return (
    <>
      <Blank />
      <Layout>
        <LeftSection>
          <CalendarComponent />
        </LeftSection>
        <RightSection>
          <ScheduleList>
            {targetDates.map((data) => {
              const formattedDate = moment(data.date).format('YYYY년 M월 D일')
              const MatchedMonth = moment(data.date).format('M')
              let isSame = month.month === MatchedMonth

              return isSame ? (
                <ScheduleLayout key={data.name}>
                  <DateInfo>{`${formattedDate}`}</DateInfo>
                  <UserWrapper>
                    <Pointer />
                    <GuestInfo>{`${data.name} (${data.id}명)`}</GuestInfo>
                  </UserWrapper>
                </ScheduleLayout>
              ) : null
            })}
            {filteredDates.length === 0 && <Noschedule>현재 예약된 일정이 없습니다..</Noschedule>}
          </ScheduleList>
        </RightSection>
      </Layout>
    </>
  )
}

export default ItineraryPage

const Layout = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  padding: 0 13rem;
  box-sizing: border-box;
`
const Blank = styled.div`
  width: 100%;
  height: 10rem;
`
const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftSection = styled(FlexCenter)`
  /* background-color: #5b5bea; */
  flex: 1;

  /* min-height: 30vh; */
`

const RightSection = styled(FlexCenter)`
  /* background-color: #ff70c4; */
  flex: 1;
  /* justify-content: flex-start; */
  /* min-height: 30vh; */
`

const ScheduleLayout = styled.div`
  /* display: flex; */
  /* background-color: mediumaquamarine; */
  width: 100%;
  margin-bottom: 5rem;
`

// const
const DateInfo = styled.div`
  width: 100%;
  height: 3rem;
  font-size: 2.5rem;
  font-weight: bold;
  /* background-color: mediumaquamarine; */
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  height: 3.5rem;
  /* background-color: red; */
`
const Pointer = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--color-original);
  border: 5px solid black;
  border-radius: 50%;
  margin-right: 1rem;
  /* margin-top: 0.4rem; */
`
const GuestInfo = styled.div`
  font-size: 1.5rem;
`
const Noschedule = styled(FlexCenter)`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 1.7rem;
`
import Arrow from 'components/icons/Arrow'
import Star from 'components/icons/Star'
import Modal from 'components/shared/Modal'
import { motion } from 'framer-motion'
import { PlaceData } from 'interfaces/plan'
import { useState } from 'react'
import styled from 'styled-components'

interface IPlaceDetail {
  isOpen: boolean
  onRequestClose: () => void
  place: PlaceData
}

const PlaceDetail = ({ isOpen, onRequestClose, place }: IPlaceDetail) => {
  const [dropdown, setDropdown] = useState<boolean>(false)

  const timeValue = (time: string) => {
    const hour = time.slice(0, 2)
    const minute = time.slice(2, 4)
    return `${hour} : ${minute}`
  }

  const defaultDays = [
    { dayOfWeek: 0, dayName: '일요일', status: '휴무' },
    { dayOfWeek: 1, dayName: '월요일', status: '휴무' },
    { dayOfWeek: 2, dayName: '화요일', status: '휴무' },
    { dayOfWeek: 3, dayName: '수요일', status: '휴무' },
    { dayOfWeek: 4, dayName: '목요일', status: '휴무' },
    { dayOfWeek: 5, dayName: '금요일', status: '휴무' },
    { dayOfWeek: 6, dayName: '토요일', status: '휴무' },
  ]

  place.openingHours?.forEach((time) => {
    const dayInfo = defaultDays.find((day) => day.dayOfWeek === time.dayOfWeek)
    if (dayInfo) {
      dayInfo.status = `${timeValue(time.openTime)} - ${timeValue(time.closeTime)}`
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose()}
      ariaHideApp={false}
      style={{
        content: {
          maxWidth: '400px',
        },
      }}
    >
      <Container>
        <PlaceTitle>{place.name}</PlaceTitle>
        <PlaceCategory>{place.category}</PlaceCategory>
        <PlaceRating>
          <Star $width="1.3rem" $height="1.3rem" $color="var(--color-primary)" />
          <div
            style={{
              marginTop: '0.3rem',
            }}
          >
            {place.rating}
          </div>
        </PlaceRating>
        <PlacePhoto>
          <img src={place.photo} alt={place.name} />
        </PlacePhoto>
        <PlaceAddress
          onClick={() => {
            window.open(place.url, '_blank')
          }}
        >
          <span>주소 :</span>
          <span>{place.address}</span>
        </PlaceAddress>
        <PhoneNum>
          <span>전화번호 :</span>
          <span>{place.phone}</span>
        </PhoneNum>
        <OpenTime
          onClick={() => {
            setDropdown(!dropdown)
          }}
        >
          <span>영업시간</span>
          <Arrow $width="1rem" $height="1rem" $color="var(--bs-black)" $angle="90deg" />
        </OpenTime>

        <TimeTableContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: dropdown ? 1 : 0, maxHeight: dropdown ? '400px' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            display: dropdown ? 'flex' : 'none',
          }}
        >
          {defaultDays.map((day) => (
            <TimeBox key={day.dayOfWeek}>
              <WeekDay>{day.dayName}</WeekDay>
              <Time>{day.status}</Time>
            </TimeBox>
          ))}
        </TimeTableContainer>
      </Container>
    </Modal>
  )
}

export default PlaceDetail

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PlaceTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const PlaceCategory = styled.div`
  font-size: 1rem;
  color: var(--bs-gray-500);
  margin-bottom: 0.5rem;
`

const PlaceRating = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`

const PlacePhoto = styled.div`
  width: 100%;
  height: 15rem;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
`

const PlaceAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: var(--bs-info);
  }
`

const PhoneNum = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`

const OpenTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
  font-weight: bold;
  cursor: pointer;
`

const TimeTableContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bs-gray-200);
  padding: 1rem;
  border-radius: 1rem;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow: hidden;
`

const WeekDay = styled.div`
  font-size: 1rem;
  color: var(--bs-black);
  font-weight: bold;
  flex: 2;
`

const Time = styled.div`
  font-size: 1rem;
  color: var(--bs-gray);
  flex: 1;
`

const TimeBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  margin-top: 0.5rem;
`

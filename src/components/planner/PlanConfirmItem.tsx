import { PlanConfirmItemData } from 'interfaces/plan'
import styled from 'styled-components'
import { categories } from './place/PlaceSelect'
import { CarIcon } from './SelectTransportation'
import Arrow from 'components/icons/Arrow'

interface PlanConfirmItemProps {
  index: number
  data: PlanConfirmItemData
}

const PlanConfirmItem = ({ index, data }: PlanConfirmItemProps) => {
  const category = categories.find((category) => category.value === data.item.category)

  const onClick = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${data.item.latitude},${data.item.longitude}
      &origin_place_id=${data.item.placeId}&destination=${data.nextLat},${data.nextLng}&destination_place_id=${data.nextPlaceGoogleId}`,
    )
  }

  return (
    <Container>
      <TimeLine>
        <Index>{index}</Index>
        <Line />

        <Duration>
          <CarIcon style={{ width: '24px', height: '24px' }} />
        </Duration>

        {data.nextTime && (
          <>
            <NextLine />
          </>
        )}
      </TimeLine>
      <Info>
        <Name>{data.item.name}</Name>
        <Category>{category?.label}</Category>
        <Time>{data.time}</Time>
        {data.nextTime && (
          <TimeBox
            onClick={() => {
              onClick()
            }}
          >
            {data.nextTime}
            <Arrow $width="1rem" $height="1rem" />
          </TimeBox>
        )}
      </Info>
      <Image>
        <img src={data.item.photo} alt={data.item.name} />
      </Image>
    </Container>
  )
}

export default PlanConfirmItem

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  height: 100px;
  position: relative;
`

const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
  position: relative;
`

const Line = styled.div`
  width: 2px;
  height: 5rem;
  background-color: var(--bs-gray-300);
`

const Index = styled.div`
  font-size: 20px;
  font-weight: 600;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
`

const NextLine = styled.div`
  width: 2px;
  height: 2rem;
  background-color: var(--bs-gray-300);
`

const Duration = styled.div`
  display: flex;
  font-size: 14px;
  color: var(--bs-gray-500);
`

const TimeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;
  position: absolute;
  bottom: 0.2rem;
  left: -1rem;
`

const Info = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  position: relative;
`

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
`

const Category = styled.div`
  font-size: 14px;
  color: var(--bs-gray-500);
`

const Time = styled.div`
  font-size: 14px;
  color: var(--bs-gray-500);
  margin-top: 1rem;
`

const Image = styled.div`
  width: 4rem;
  height: 4rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`

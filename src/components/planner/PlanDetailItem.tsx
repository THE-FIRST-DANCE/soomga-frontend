import { getTransCoord } from 'api/PlanAPI'
import Arrow from 'components/icons/Arrow'
import CarIcon from 'components/icons/CarIcon'
import Time from 'components/icons/Time'
import { PlanConfirmListItem } from 'interfaces/plan'
import styled from 'styled-components'

const PlanDetailItem = ({ item, isLast }: { item: PlanConfirmListItem; isLast: boolean }) => {
  // 카카오 지도 연결
  const onClick = async () => {
    const { x: originX, y: originY } = await getTransCoord(item.item.longitude, item.item.latitude)
    const { x: destX, y: destY } = await getTransCoord(item.nextLng, item.nextLat)

    const mapType = 'TYPE_MAP'
    const target = 'transit'
    const rt = originX + ',' + originY + ',' + destX + ',' + destY
    const rt1 = item.item.name
    const rt2 = item.nextPlaceName

    // 카카오
    window.open(`https://map.kakao.com/?map_type=${mapType}&target=${target}&rt=${rt}&rt1=${rt1}&rt2=${rt2}`)
  }

  return (
    <Container $isLast={isLast}>
      <Schedule>
        <ScheduleImg>
          <img src={item.item.photo} alt="schedule" />

          {!isLast && (
            <Route>
              <CarIcon className="car-icon" style={{ width: '1.5rem', height: '1.5rem' }} />
              <RouteTime
                onClick={() => {
                  onClick()
                }}
              >
                {item?.nextTime}
                <Arrow $width="1.3rem" $height="1.3rem" />
              </RouteTime>
            </Route>
          )}
        </ScheduleImg>
        <ScheduleInfo>
          <IconText>
            <Time $width="1.2rem" $height="1.2rem" />
            {item.stayTime}
          </IconText>
          <Name>{item.item.name}</Name>
        </ScheduleInfo>
        <Description>{item.description}</Description>
      </Schedule>
    </Container>
  )
}

export default PlanDetailItem

const Container = styled.div<{ $isLast?: boolean }>`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  margin-bottom: ${(props) => (props.$isLast ? 'none' : '5rem')};
`

const Schedule = styled.div`
  display: flex;
`

const ScheduleImg = styled.div`
  width: 150px;
  height: 150px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }
`

const ScheduleInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  flex: 0.3;
  padding: 1rem;
`

const Description = styled.div`
  flex: 1;
  background-color: var(--bs-gray-200);
  padding: 1rem;
  border-radius: 0.5rem;
  white-space: pre-wrap;
`

const IconText = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  font-size: 1rem;
  color: var(--bs-gray-600);
`

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

const Route = styled.div`
  position: absolute;
  right: 50%;
  transform: translate(50%);
  height: 80%;
  background-color: var(--bs-gray-200);

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    left: 0;
    background-color: var(--bs-gray-200);
  }

  &::before {
    top: 0;
    height: 40%;
  }

  &::after {
    bottom: 0;
    height: 40%;
  }

  .car-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const RouteTime = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 6rem;
  top: 50%;
  left: 1.5rem;
  transform: translate(0, -30%);
  font-size: 1rem;
  color: var(--bs-gray-600);
  cursor: pointer;

  svg {
    padding-bottom: 3px;
  }
`

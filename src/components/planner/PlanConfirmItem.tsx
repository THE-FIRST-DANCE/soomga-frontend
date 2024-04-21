import styled from 'styled-components'
import { categories } from './place/PlaceSelect'
import { CarIcon } from './SelectTransportation'
import Arrow from 'components/icons/Arrow'
import { getTransCoord } from 'api/PlanAPI'
import { PlanConfirmListItem } from 'interfaces/plan'
import { useEffect, useState } from 'react'
import { PlanConfirmList } from 'state/store/PlanList'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CurrentPeriod } from 'state/store/PlanInfo'

interface PlanConfirmItemProps {
  index: number
  data: PlanConfirmListItem
}

const PlanConfirmItem = ({ index, data }: PlanConfirmItemProps) => {
  const category = categories.find((category) => category.value === data.item.category)
  const [planConfirmList, setPlanConfirmList] = useRecoilState(PlanConfirmList)
  const currentPeriod = useRecoilValue(CurrentPeriod)
  const [descript, setDescript] = useState<string>(data.description || '')

  // 카카오 지도 연결
  const onClick = async () => {
    const { x: originX, y: originY } = await getTransCoord(data.item.longitude, data.item.latitude)
    const { x: destX, y: destY } = await getTransCoord(data.nextLng, data.nextLat)

    const mapType = 'TYPE_MAP'
    const target = 'transit'
    const rt = originX + ',' + originY + ',' + destX + ',' + destY
    const rt1 = data.item.name
    const rt2 = data.nextPlaceName

    // 카카오
    window.open(`https://map.kakao.com/?map_type=${mapType}&target=${target}&rt=${rt}&rt1=${rt1}&rt2=${rt2}`)
  }

  // 설명 작성
  const onDescript = () => {
    const list = planConfirmList.periodPlan[currentPeriod]
    const newList = list.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          description: descript,
        }
      }
      return item
    })

    setPlanConfirmList({
      ...planConfirmList,
      periodPlan: {
        ...planConfirmList.periodPlan,
        [currentPeriod]: newList,
      },
    })
  }

  useEffect(() => {
    setDescript(data.description || '')
  }, [data.item])

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
        <Time>{data.stayTime}</Time>
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

      <Description
        placeholder="설명을 입력해주세요"
        value={descript}
        onChange={(e) => {
          setDescript(e.target.value)
          onDescript()
        }}
      />

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

const Description = styled.textarea`
  flex: 0.5;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  background-color: var(--bs-gray-200);
  color: var(--bs-gray-600);
  border-radius: 0.5rem;
  margin: 0 1rem;
`

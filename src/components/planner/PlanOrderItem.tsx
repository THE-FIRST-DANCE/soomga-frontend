import Cancel from 'components/icons/Cancel'
import { motion } from 'framer-motion'
import useSubstring from 'hooks/useSubstring'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CurrentPeriod } from 'recoil/atoms/PlanInfo'
import { PeriodPlanRecoil, PlanListRecoil } from 'recoil/atoms/PlanList'
import styled from 'styled-components'

interface PlanOrderItemProps {
  item: PlanListRecoil
  fold?: boolean
}

const PlanOrderItem = ({ item, fold }: PlanOrderItemProps) => {
  const [periodPlan, setPlanList] = useRecoilState(PeriodPlanRecoil)
  const currentPeriod = useRecoilValue(CurrentPeriod)

  const [timeMod, setTimeMod] = useState<boolean>(false)
  const [hour, setHour] = useState<number>(1)
  const [minute, setMinute] = useState<number>(0)

  if (!item) return null

  const address = useSubstring(item.item.address, 15)
  const name = useSubstring(item.item.name, 5)

  const currentPlan = periodPlan[currentPeriod] || []

  const deleteItem = () => {
    const newPlan = currentPlan.filter((plan) => plan.item.placeId !== item.item.placeId)
    const newPlanOrder = newPlan.map((plan, index) => {
      return {
        ...plan,
        order: index + 1,
      }
    })
    setPlanList({
      ...periodPlan,
      [currentPeriod]: newPlanOrder,
    })
  }

  const changeTime = () => {
    setTimeMod(false)
    const newPlan = currentPlan.map((plan) => {
      if (plan.item.placeId === item.item.placeId) {
        return {
          ...plan,
          time: `${hour}시간 ${minute}분`,
        }
      }
      return plan
    })

    setPlanList({
      ...periodPlan,
      [currentPeriod]: newPlan,
    })
  }

  if (fold)
    return (
      <FoldOrder>
        <Order $fold={fold}>{item.order}</Order>
      </FoldOrder>
    )

  return (
    <Container initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }} key={item.item.placeId}>
      <Order>{item.order}</Order>
      <Item>
        {timeMod ? (
          <TimeMod>
            <p>머무는 시간</p>
            <TimeInput type="number" max={24} min={0} value={hour} onChange={(e) => setHour(Number(e.target.value))} />
            <span>시간</span>
            <TimeInput
              type="number"
              max={60}
              min={0}
              value={minute}
              onChange={(e) => setMinute(Number(e.target.value))}
            />
            <span>분</span>
            <TimeButton onClick={changeTime}>확인</TimeButton>
          </TimeMod>
        ) : (
          <>
            <ItemImage>
              <img src={item.item.photo} alt="아이템 이미지" />
            </ItemImage>
            <ItemInfo>
              <ItemName>{name}</ItemName>
              <ItemAddress>{address}</ItemAddress>
            </ItemInfo>
            <SetTime onClick={() => setTimeMod(!timeMod)}>{item.time}</SetTime>
            <div
              style={{
                cursor: 'pointer',
              }}
              onClick={deleteItem}
            >
              <Cancel $width="1.5rem" $height="1.5rem" $color="var(--bs-gray-100)" />
            </div>
          </>
        )}
      </Item>
    </Container>
  )
}

export default PlanOrderItem

const Container = styled(motion.div)`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
`

const FoldOrder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`

const Order = styled.div<{ $fold?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $fold }) => ($fold ? '2rem' : '1.5rem')};
  height: ${({ $fold }) => ($fold ? '2rem' : '1.5rem')};
  box-sizing: border-box;
  border-radius: 50%;
  background-color: var(--bs-gray-600);
  color: var(--bs-white);
`

const Item = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-left: 1rem;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: var(--bs-box-shadow);
`

const ItemImage = styled.div`
  width: 3rem;
  height: 3rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25%;
  }
`

const ItemInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
  cursor: pointer;
`

const ItemName = styled.div`
  font-size: 16px;
  font-weight: 600;
`

const ItemAddress = styled.div`
  font-size: 14px;
  color: var(--bs-gray-500);
  margin-top: 0.5rem;
`

const SetTime = styled.div`
  color: var(--bs-info);
  margin: 4px 0.5rem 0 0;
  cursor: pointer;
`

const TimeMod = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TimeInput = styled.input`
  width: 3rem;
  height: 2rem;
  border: none;
  padding: 0 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  text-align: center;
  outline: none;
  color: var(--bs-gray-700);
`

const TimeButton = styled.button`
  height: 2rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  color: var(--bs-info);
  background-color: var(--bs-white);
`

import { motion } from 'framer-motion'
import { useState } from 'react'
import { CurrentPeriod } from 'recoil/atoms/PlanInfo'
import styled from 'styled-components'
import PlanOrderItem from './PlanOrderItem'
import { useRecoilState, useRecoilValue } from 'recoil'
import { PeriodPlanRecoil, PlanTime } from 'recoil/atoms/PlanList'
import Arrow from 'components/icons/Arrow'
import useCalculateTotalTime from 'hooks/useCalcurateTotalTime'

const PlanOrder = () => {
  const [fold, setFold] = useState<boolean>(false)
  const [timeMod, setTimeMod] = useState<boolean>(false)

  const currentPeriod = useRecoilValue(CurrentPeriod)
  const [planPeriod, setPlanPeriod] = useRecoilState(PeriodPlanRecoil)
  const [planTime, setPlanTime] = useRecoilState(PlanTime)

  const hour = Number(planTime.split('시간')[0])
  const minute = Number(planTime.split('시간')[1].split('분')[0])

  const [hourState, setHourState] = useState<number>(hour)
  const [minuteState, setMinuteState] = useState<number>(minute)

  const planList = planPeriod[currentPeriod] || []

  const resetPlan = () => {
    setPlanPeriod((prev) => {
      const newPlan = { ...prev }
      newPlan[currentPeriod] = []
      return newPlan
    })
  }

  const handleFold = () => {
    setFold(!fold)
  }

  const totalTime = useCalculateTotalTime(planList)

  return (
    <Container fold={fold}>
      {fold ? (
        <>
          <FoldHeader>{planList.length}</FoldHeader>
          {planList.map((item, index) => (
            <PlanOrderItem fold={fold} key={index} item={item} />
          ))}
        </>
      ) : (
        <>
          <Header>
            <CountTime>
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                {planList.length}
              </span>
              {!timeMod ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>{totalTime}</div>
                  <div
                    style={{
                      margin: '0 0.5rem',
                    }}
                  >
                    /
                  </div>

                  <div
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setTimeMod(true)
                    }}
                  >
                    {planTime}
                  </div>
                </div>
              ) : (
                <FlexCenter>
                  <TimeInput type="number" value={hourState} onChange={(e) => setHourState(Number(e.target.value))} />
                  <span>시간</span>
                  <TimeInput
                    type="number"
                    value={minuteState}
                    onChange={(e) => setMinuteState(Number(e.target.value))}
                  />
                  <span>분</span>
                </FlexCenter>
              )}
            </CountTime>
            {timeMod ? (
              <div
                style={{
                  cursor: 'pointer',
                  color: 'var(--bs-info)',
                }}
                onClick={() => {
                  setPlanTime(`${hourState}시간 ${minuteState}분`)
                  setTimeMod(false)
                }}
              >
                확인
              </div>
            ) : (
              <ResetButton
                onClick={() => {
                  resetPlan()
                }}
              >
                장소 초기화
              </ResetButton>
            )}
          </Header>
          <PlanOrderList>
            {planList.map((item, index) => (
              <PlanOrderItem key={index} item={item} />
            ))}
          </PlanOrderList>
        </>
      )}
      <FoldButton onClick={handleFold}>
        <Arrow $width="1.5rem" $height="1.5rem" $color="var(--bs-dark)" $angle={fold ? '0deg' : '180deg'} />
      </FoldButton>
    </Container>
  )
}

export default PlanOrder

const Container = styled(motion.div)<{ fold: boolean }>`
  width: ${({ fold }) => (fold ? '80px' : '350px')};
  padding: 2rem;
  position: relative;

  transition: width 0.5s;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const TimeInput = styled.input`
  width: 3rem;
  height: 1.5rem;
  text-align: center;
  margin: 0 0.5rem;
`

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FoldHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`

const CountTime = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const ResetButton = styled.div`
  cursor: pointer;
  color: var(--bs-danger);
  font-weight: bold;
`

const PlanOrderList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  margin-top: 2rem;
`

const FoldButton = styled.div`
  position: absolute;
  top: 50%;
  right: -1.5rem;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 2.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: var(--bs-white);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
`

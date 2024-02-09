import { motion } from 'framer-motion'
import useTimeDifference from 'hooks/useTimeDifference'
import { useState } from 'react'
import { PlanInfo } from 'recoil/atoms/PlanInfo'
import styled from 'styled-components'
import PlanOrderItem from './PlanOrderItem'
import { useRecoilValue } from 'recoil'
import { PlanListRecoil } from 'recoil/atoms/PlanList'
import Arrow from 'components/icons/Arrow'
import useCalculateTotalTime from 'hooks/useCalcurateTotalTime'

interface PlanOrderProps {
  plan: PlanInfo
}

const PlanOrder = ({ plan }: PlanOrderProps) => {
  const [fold, setFold] = useState<boolean>(false)
  const time = useTimeDifference(plan.startTime, plan.endTime)
  const planList = useRecoilValue(PlanListRecoil)
  const totalTime = useCalculateTotalTime(planList)

  const handleFold = () => {
    setFold(!fold)
  }

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
              <span>
                {totalTime} / {time}
              </span>
            </CountTime>

            <ResetButton>장소 초기화</ResetButton>
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
  z-index: 100;
`

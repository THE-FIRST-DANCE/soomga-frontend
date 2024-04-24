import { useState } from 'react'
import { PlanInfo } from 'state/store/PlanInfo'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import PlaceSelect from './PlaceSelect'
import PlaceAdd from './PlaceAdd'

const menu = ['장소 선택', '장소 추가']

const Places = ({ plan }: { plan: PlanInfo }) => {
  const [currentTab, setCurrentTab] = useState<number>(0)

  const underlineStyle = {
    left: `${currentTab * 50}%`,
  }

  return (
    <Container>
      <Title>{plan.province}</Title>

      {/* 네비게이션 탭 */}
      <Navibar>
        {menu.map((item, index) => (
          <NavibarItem
            key={index}
            onClick={() => setCurrentTab(index)}
            className={currentTab === index ? 'active' : ''}
          >
            {item}
          </NavibarItem>
        ))}
        <Underline
          className="underline"
          layoutId="underline"
          initial={false}
          animate={underlineStyle}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </Navibar>

      {/* 장소선택 탭 */}
      {currentTab === 0 && <PlaceSelect region={plan.province} />}

      {/* 장소추가 탭 */}
      {currentTab === 1 && <PlaceAdd plan={plan} />}
    </Container>
  )
}

export default Places

const Container = styled.div`
  width: 350px;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-top: 1rem;
`

const Navibar = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  padding: 0.5rem;
  box-sizing: border-box;
  margin-top: 1rem;
`

const NavibarItem = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &.active {
    color: var(--color-primary);
  }
`

const Underline = styled(motion.div)`
  position: absolute;
  bottom: 0;
  height: 3px;
  width: 50%;
  background-color: var(--color-primary);
`

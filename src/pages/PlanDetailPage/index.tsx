import { useQuery } from '@tanstack/react-query'
import { getPlanById } from 'api/PlanAPI'
import HeartIcon from 'components/icons/Heart'
import ViewIcon from 'components/icons/View'
import { Plans } from 'interfaces/plan'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { PlanDetailCommentsTab, PlanDetailPlanTab } from './tab'
import { motion } from 'framer-motion'

const PlanDetailPage = () => {
  const [plan, setPlan] = useState<Plans>()
  const [currentTab, setCurrentTab] = useState<number>(0)
  const { planId } = useParams<{ planId: string }>()
  const navigate = useNavigate()

  const MENU = ['일정', '댓글', '리뷰']

  const { data } = useQuery({
    queryKey: ['planDetail', planId],
    queryFn: () => getPlanById(Number(planId)),
  })

  const underlineStyle = {
    left: `${currentTab * 33.33}%`,
  }

  useEffect(() => {
    if (data) {
      setPlan(data)
    }
  }, [data])

  const toDetail = () => {
    navigate(`/planner/confirm/${planId}`)
  }

  return (
    <Container>
      <Header>
        <HeaderOverlay />
        <DetailButton
          onClick={() => {
            toDetail()
          }}
        >
          상세정보
        </DetailButton>
        <Title>{plan?.title}</Title>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <Region>{plan?.region}</Region>

          <Period>{plan?.period}일</Period>
        </div>
        <User>
          <Avatar src={plan?.author.avatar} />
          <Username>{plan?.author.nickname}</Username>
        </User>
        <SubInfo>
          <IconText>
            <HeartIcon style={{ width: '1rem', height: '1rem' }} />
            10
          </IconText>
          <IconText>
            <ViewIcon style={{ width: '1rem', height: '1rem' }} />
            100
          </IconText>
        </SubInfo>
      </Header>
      <Navibar>
        {MENU.map((item, index) => (
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

      {currentTab === 0 && plan && <PlanDetailPlanTab item={plan?.daySchedules} />}
      {currentTab === 1 && <PlanDetailCommentsTab comments={plan?.comments} planId={plan?.id} />}
    </Container>
  )
}

export default PlanDetailPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10rem;
`

const Header = styled.div`
  height: 400px;
  width: 100%;
  padding: 2rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: var(--bs-gray-200);
  color: var(--bs-gray-600);

  position: relative;
`

const DetailButton = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  background-color: var(--color-primary);
  color: var(--bs-gray-600);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  z-index: 2;
`

const HeaderOverlay = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  width: 100%;
  height: 250px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: 0 0 0.5rem 0.5rem;
  z-index: 1;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Region = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
`

const Period = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
`

const User = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
`

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

const Username = styled.div`
  font-size: 1rem;
`

const SubInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
`

const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  width: 33.33%;
  background-color: var(--color-primary);
`

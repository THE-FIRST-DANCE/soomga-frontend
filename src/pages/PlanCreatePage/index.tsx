import GoogleMapLoad from 'components/planner/GoogleMap'
import Places from 'components/planner/PlaceTab'
import PlanOrder from 'components/planner/PlanOrder'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { planInfo } from 'recoil/atoms/PlanInfo'
import styled from 'styled-components'

const PlanCreatePage = () => {
  const [plan] = useRecoilState(planInfo)

  const navigate = useNavigate()

  useEffect(() => {
    // 페이지를 벗어나기 전에 확인
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = '변경사항이 저장되지 않았습니다. 페이지를 벗어나시겠습니까?'
      event.preventDefault()
      event.returnValue = message
      return message
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (!plan.title) {
      navigate('/planner')
    }
  }, [plan.title, navigate])

  return (
    <Container>
      <LeftSection>
        <Places plan={plan} />
        <PlanOrder />
      </LeftSection>
      <RightSection>
        <GoogleMapLoad
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{
            lat: plan.lat,
            lng: plan.lng,
          }}
        />
      </RightSection>
    </Container>
  )
}

export default PlanCreatePage

const Container = styled.div`
  display: flex;
`

const LeftSection = styled.div`
  display: flex;
  height: 100vh;
`

const RightSection = styled.div`
  flex: 2;
  height: 100vh;
`

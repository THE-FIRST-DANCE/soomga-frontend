import { getPlaceRoute } from 'api/PlanAPI'
import GoogleMapLoad from 'components/planner/GoogleMap'
import PlanConfirmItem from 'components/planner/PlanConfirmItem'
import { PlanConfirmItemData } from 'interfaces/plan'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { PlanInfo } from 'recoil/atoms/PlanInfo'
import { PlanListConfirm } from 'recoil/atoms/PlanList'
import styled from 'styled-components'

const PlanConfirm = () => {
  const [planList, setPlanList] = useState<PlanConfirmItemData[]>([])

  const planInfo = useRecoilValue(PlanInfo)
  const plan = useRecoilValue(PlanListConfirm)

  const onClick = async () => {
    const data = await getPlaceRoute(plan.planList)
    setPlanList(data)
  }

  return (
    <Container>
      <LeftSection>
        <Header>
          <Title>{planInfo.title}</Title>
          <Region>{planInfo.province}</Region>
        </Header>

        {planList.length > 0 ? (
          planList.map((item, index) => <PlanConfirmItem index={index} key={index} data={item} />)
        ) : (
          <button onClick={onClick}>경로 확인</button>
        )}
      </LeftSection>
      <RightSection>
        <GoogleMapLoad
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{
            lat: planInfo.lat,
            lng: planInfo.lng,
          }}
        />
      </RightSection>
    </Container>
  )
}

export default PlanConfirm

const Container = styled.div`
  display: flex;
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
`

const RightSection = styled.div`
  flex: 2;
  height: 100vh;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #f2f2f2;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`

const Region = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`

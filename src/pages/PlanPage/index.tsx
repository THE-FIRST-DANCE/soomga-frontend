import { getPlanList } from 'api/PlanAPI'
import CreatePlan from 'components/planner/CreatePlan'
import GoogleMapLoad from 'components/planner/GoogleMap'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { Plans } from 'interfaces/plan'
import { useEffect, useState } from 'react'
import PlanItem from 'components/planner/PlanItem'

const PlanPage = () => {
  const [plans, setPlans] = useState<Plans[]>([])

  const { data } = useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlanList(68),
  })

  useEffect(() => {
    if (data) {
      setPlans(data)
    }
  }, [data])

  return (
    <Container>
      <LeftSection>
        <CreatePlan />
        <PlanListStyle>
          <PlanItems>
            {plans.map((plan: Plans) => (
              <PlanItem key={plan.id} data={plan} />
            ))}
          </PlanItems>
        </PlanListStyle>
      </LeftSection>
      <RightSection>
        <GoogleMapLoad mapContainerStyle={{ width: '100%', height: '100%' }} />
      </RightSection>
    </Container>
  )
}

export default PlanPage

const Container = styled.div`
  display: flex;
`

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const RightSection = styled.div`
  flex: 2;
  height: 100vh;
`

const PlanListStyle = styled.div`
  flex: 1;
`

const PlanItems = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

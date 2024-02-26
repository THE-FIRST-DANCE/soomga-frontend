import { getPlanList } from 'api/PlanAPI'
import CreatePlan from 'components/planner/CreatePlan'
import GoogleMapLoad from 'components/planner/GoogleMap'
import PlanList from 'components/planner/PlanList'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

const PlanPage = () => {
  const { data } = useQuery({
    queryKey: ['plans'],
    queryFn: () => getPlanList(1),
  })

  console.log(data)

  return (
    <Container>
      <LeftSection>
        <CreatePlan />
        {data && <PlanList data={data} />}
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

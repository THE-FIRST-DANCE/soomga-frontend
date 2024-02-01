import CreatePlan from 'components/planner/CreatePlan'
import Map from 'components/planner/Map'
import PlanList from 'components/planner/PlanList'
import styled from 'styled-components'

const PlanPage = () => {
  return (
    <Container>
      <LeftSection>
        <CreatePlan />
        <PlanList />
      </LeftSection>
      <RightSection>
        <Map />
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
  background-color: aquamarine;
`

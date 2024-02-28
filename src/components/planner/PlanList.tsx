import styled from 'styled-components'
import PlanItem from './PlanItem'
import { Plans } from 'interfaces/plan'

interface PlanListProps {
  data: Plans[]
}

const PlanList = ({ data }: PlanListProps) => {
  return (
    <Container>
      <PlanItems>
        {data.map((plan) => (
          <PlanItem key={plan.id} data={plan} />
        ))}
      </PlanItems>
    </Container>
  )
}

export default PlanList

const Container = styled.div`
  flex: 1;
`

const PlanItems = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

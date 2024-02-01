import styled from 'styled-components'
import PlanItem from './PlanItem'

const PlanList = () => {
  return (
    <Container>
      <PlanItems>
        <PlanItem name="제주도" description="제주도 여행" full_time="총 6시간" id={1} place_id={1} />
        <PlanItem name="제주도" description="제주도 여행" full_time="총 6시간" id={1} place_id={1} />
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

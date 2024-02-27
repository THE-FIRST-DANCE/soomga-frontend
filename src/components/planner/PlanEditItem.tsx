import styled from 'styled-components'
import { categories } from './place/PlaceSelect'
import { PlanListRecoil } from 'state/store/PlanList'
import Cancel from 'components/icons/Cancel'

interface PlanEditItemProps {
  data: PlanListRecoil
  index: number
  onDelete: (index: number) => void
}

const PlanEditItem = ({ data, index, onDelete }: PlanEditItemProps) => {
  const category = categories.find((item) => item.value === data.item.category)

  return (
    <Container>
      <Body>
        <Order>{index}</Order>
        <Content>
          <Name>{data.item.name}</Name>
          <Category>{category?.label}</Category>
          <Time>{data.stayTime}</Time>
        </Content>
        <div
          onClick={() => {
            onDelete(index)
          }}
        >
          <Cancel $width="20px" $height="20px" $color="var(--bs-gray-400)" />
        </div>
      </Body>
    </Container>
  )
}

export default PlanEditItem

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  background-color: var(--bs-gray-100);
  border-radius: 1rem;
  box-sizing: border-box;
  box-shadow: var(--bs-box-shadow);
  cursor: pointer;
`

const Body = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;
`

const Order = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 1.7rem;
  border-radius: 100%;
  background-color: var(--color-primary);
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.1rem;
`

const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
`

const Category = styled.div`
  font-size: 14px;
  color: var(--bs-gray-400);
`

const Time = styled.div`
  font-size: 16px;
  color: var(--bs-gray-800);
`

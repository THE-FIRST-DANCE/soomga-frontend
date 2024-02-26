import { PlaceData } from 'interfaces/plan'
import styled from 'styled-components'
import { categories } from './PlaceSelect'

const PlaceEditAddItem = ({ data }: { data: PlaceData }) => {
  const category = categories.find((item) => item.value === data.category)

  return (
    <Container>
      <Body>
        <Content>
          <Name>{data.name}</Name>
          <Category>{category?.label}</Category>
        </Content>
      </Body>
    </Container>
  )
}

export default PlaceEditAddItem

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

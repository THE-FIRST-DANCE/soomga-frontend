import styled from 'styled-components'
import Spinner from './Spinner'

const FullLoading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Container>
      <Spinner type="ClipLoader" loading={isLoading} />
    </Container>
  )
}

export default FullLoading

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`

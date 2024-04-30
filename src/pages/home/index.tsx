import GoogleMapLoad from 'components/planner/GoogleMap'
import { styled } from 'styled-components'
import ReactModal from 'react-modal'
import { MainPage } from './MainPage'
ReactModal.setAppElement('#root')

export default MainPage

export const InnerContainer_div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 3rem 0;
`

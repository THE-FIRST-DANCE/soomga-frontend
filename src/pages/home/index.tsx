import MainVideo from 'components/home/MainVideo'
import RecommendedRegions from 'components/home/RecommendedRegions'
import Map from 'components/planner/Map'
import { styled } from 'styled-components'

const MainPage = () => {
  return (
    <>
      <MainVideo />
      <RecommendedRegions />
      <InnerContainer_div>
        <Map width="70%" height="600px" zoom={7} />
      </InnerContainer_div>
    </>
  )
}

export default MainPage

const InnerContainer_div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 150px 0;
`

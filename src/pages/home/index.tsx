import MainVideo from 'components/home/MainVideo'
import RecommendedRegions from 'components/home/SRecommendedRegions'
import URecommendedRegions from 'components/home/URecommendedRegions'
import GoogleMapLoad from 'components/planner/GoogleMap'
import Map from 'components/planner/Map'
import { styled } from 'styled-components'

const MainPage = () => {
  return (
    <>
      {/* 1. 비디오 */}
      <MainVideo />
      {/* 2. 숨가 추천지역 */}
      <RecommendedRegions />
      {/* 3. 한국 지도 */}
      <InnerContainer_div>
        {/* <Map width="70%" height="600px" zoom={7} /> */}
        <GoogleMapLoad
          mapContainerStyle={{
            width: '70%',
            height: '600px',
          }}
          zoom={8}
        />
      </InnerContainer_div>
      {/* 4. sos페이지(갑자기 도움이 필요할 때) + 추천 지역(내 취향에 맞는 여행지를 찾아봐) */}
      <URecommendedRegions />
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

import Chatting from 'components/chat/Chatting'
import ChatButton from 'components/home/ChatButton'
import CommentCarousel from 'components/home/CommentCarousel'
import MainVideo from 'components/home/MainVideo'
import RegionCarousel from 'components/home/RegionCarousel'
import RecommendedRegions from 'components/home/SRecommendedRegions'
import URecommendedRegions from 'components/home/URecommendedRegions'
import GoogleMapLoad from 'components/planner/GoogleMap'
import { styled } from 'styled-components'
import ReactModal from 'react-modal'
import { useState } from 'react'
ReactModal.setAppElement('#root')

const MainPage = () => {
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false)

  const openChatHandler = () => {
    setIsOpenChat((prev) => !prev)
  }

  return (
    <>
      {/* 1. 비디오 */}
      <MainVideo />

      {/* 2. 숨가 추천지역 */}
      <RecommendedRegions />

      {/* 3. 한국 지도 */}
      <InnerContainer_div>
        {/* <Map width="70%" height="600px" zoom={7} /> */}
        {/* FIXME: 사용할 떄마다 요금이 청구되니 잠시 꺼두자 */}
        {/* <GoogleMapLoad
          mapContainerStyle={{
            // width: '53%',
            width: '50rem',
            height: '20rem',
            // height: '600px',
          }}
          zoom={7.4}
          center={{ lat: 36.55, lng: 127.7669 }}
        /> */}
      </InnerContainer_div>

      {/* 4. sos페이지(갑자기 도움이 필요할 때) + 추천 지역(내 취향에 맞는 여행지를 찾아봐) */}
      <URecommendedRegions />

      {/* 5. 좋아요 수에 의한 추천 지역 캐러셀 FIXME: 아직 api 설계 안됨 */}
      <RegionCarousel />

      {/* 6. 사용자 댓글 캐러셀  FIXME: 아직 api 설계 안됨 */}
      <CommentCarousel />

      {/* 7. 대화 버튼 - 버튼 누르면 모달발생  FIXME: 아직 api 설계 안됨*/}
      <ChatButton onClick={openChatHandler} />
      {isOpenChat && <Chatting onClick={openChatHandler} />}
    </>
  )
}

export default MainPage

const InnerContainer_div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 3rem 0;
`

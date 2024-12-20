import Chatting from 'components/chat/Chatting'
import ChatButton from 'components/home/ChatButton'
import CommentCarousel from 'components/home/CommentCarousel'
import MainVideo from 'components/home/MainVideo'
import RegionCarousel from 'components/home/RegionCarousel'
import RecommendedRegions from 'components/home/SRecommendedRegions'
import URecommendedRegions from 'components/home/URecommendedRegions'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getRooms } from 'api/ChatAPI'
import { useRecoilState } from 'recoil'
import { ChatList } from 'state/store/ChatList'
import { InnerContainer_div } from '.'
import { IsClickAtMain } from 'state/store/IsClickAtMain'
import SimpleIntroduction from './SimpleIntroduction'

export const MainPage = () => {
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState(null)
  const [chatList, setChatList] = useRecoilState(ChatList)
  // const [isClickAtMain, setIsClickAtMain] = useState(false)

  // recoil로 메인 페이지에서 대화창 눌렀는지를 감지
  const [isClickAtMain, setIsClickAtMain] = useRecoilState(IsClickAtMain)

  useEffect(() => {
    //! 현재 Login한 유저 id
    const userInfo = localStorage.getItem('userInfo')
    setUserInfo(userInfo ? JSON.parse(userInfo) : null)

    //! 방정보 가져오기
    const fetchGetRooms = async () => {
      const data = await getRooms()

      setChatList(data) // 리코일 값
    }
    fetchGetRooms()
  }, [chatList.length])

  const startChatHandler = () => {
    // 1. 로그인 안되어 있으면 로그인 해라고 알려주기
    if (localStorage.getItem('userInfo') === '{}') {
      toast.error('로그인이 필요한 기능입니다.')
      return
    }
    // 2. 채팅 모달창 띄우기
    setIsOpenChat((prev) => !prev)
    setIsClickAtMain((prev) => ({
      ...prev,
      isClicked: true,
    }))
  }

  return (
    <>
      {/* 1. 비디오 */}
      <MainVideo />
      <SimpleIntroduction />
      <div style={{ display: 'flex', justifyContent: 'center', height: '2rem' }} />
      {/* 2. 숨가 추천지역 */}
      <RecommendedRegions />
      {/* 3. 한국 지도 */}
      {/* <InnerContainer_div> */}
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
      {/* </InnerContainer_div> */}
      {/* 4. sos페이지(갑자기 도움이 필요할 때) + 추천 지역(내 취향에 맞는 여행지를 찾아봐) */}
      {/* <URecommendedRegions /> */}
      {/* 5. 좋아요 수에 의한 추천 지역 캐러셀 FIXME: 아직 api 설계 안됨 */}
      {/* <RegionCarousel /> */}
      {/* 6. 사용자 댓글 캐러셀  FIXME: 아직 api 설계 안됨 */}
      {/* <CommentCarousel /> */}
      {/* 7. 대화 버튼 - 버튼 누르면 모달발생  FIXME: 아직 api 설계 안됨*/}
      <ChatButton onClick={startChatHandler} />
      {isOpenChat && <Chatting userInfo={userInfo} onClick={startChatHandler} />}
    </>
  )
}

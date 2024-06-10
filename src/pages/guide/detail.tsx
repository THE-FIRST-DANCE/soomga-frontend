import styled from 'styled-components'
import userImage from 'assets/userImage.svg'
import XIcon from 'components/icons/XIcon'
import InstagramIcon from 'components/icons/InstagramIcon'
import AuthIcon from 'components/icons/AuthIcon'
import ChatIcon from 'components/icons/ChatIcon'
import FollowIcon from 'components/icons/FollowIcon'
import CautionIcon from 'components/icons/CautionIcon'
import { useEffect, useRef, useState } from 'react'
import seoul from '../../assets/seoul.png'
import busan from '../../assets/busan.png'
import ulsan from '../../assets/ulsan.png'
import Time from 'components/icons/Time'
import Arrow from 'components/icons/Arrow'
import CarIcon from 'components/icons/CarIcon'
import 'react-calendar/dist/Calendar.css'
import CircleCheck from 'components/icons/CircleCheck'
import Comunication from 'components/icons/Comunication'
import Location from 'components/icons/Location'
import Star from 'components/icons/Star'
import CalendarComponent from 'components/itineraryCalendar/Calendar'
import { useParams } from 'react-router-dom'
import { getGuideServices, getReviews, getSelectedGuide } from 'api/GuidePageAPI'
import moment from 'moment'
import Chatting from 'components/chat/Chatting'
import { toast } from 'react-toastify'
import guideImg from '../../assets/guideImg.png'
import React from 'react'
import { Review } from '../../interfaces/review'
import { createRoom, getRooms } from 'api/ChatAPI'
import { Member, Room } from 'interfaces/chat'
import { Plans } from 'interfaces/plan'

import { useRecoilState } from 'recoil'
import { ChatList } from 'state/store/ChatList'
import { IsClickAtMain } from 'state/store/IsClickAtMain'
import PlanItem from 'components/planner/PlanItem'

const plans = [
  {
    seoul: [],
    locations: [1, 2, 3],
  },
  {
    seoul: [],
    locations: [1, 2, 3, 4],
  },
]

interface GuideService {
  name: string
  photo: string
  description: string
  price: string
}

const GuideDetailPage = () => {
  // 🌈 가이드 id 값
  const { id } = useParams()

  // 🌈 유저 id 값
  const [userId, setUserId] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  const [isClickAtChat, setIsClickAtChat] = useRecoilState(IsClickAtMain)
  // 🌈 채팅 리스트
  // const [chatLists, setChatLists] = useState<Room[]>([])
  // console.log('🩷채팅 리스트🩷 : ', chatLists)

  // 🌈 채팅 목록 리스트 Reocil값
  const [chatList, setChatList] = useRecoilState(ChatList)
  console.log('chatList: ', chatList)

  // 가이드 서비스 값
  const [guideServices, setGuideServices] = useState<GuideService[]>(null)
  console.log('🔶🔶🔶services: ', guideServices)

  const createRoomHandler = async () => {
    let roomExists = false

    // 채팅 리스트를 순회하면서 같은 이름의 방이 있는지 확인
    // chatLists.forEach((room) => {
    chatList.forEach((room) => {
      if (room.name === guideInfos.nickname) {
        roomExists = true
        console.log('이미 존재하는 방입니다:', room.name)
      }
    })

    // 같은 이름의 방이 없을 경우 새로운 방을 생성
    if (!roomExists) {
      console.log('새로운 가이드와의 대화 시작!')
      const newRoom = await createRoom({ me: Number(userId), counterpart: Number(id) })
      console.log('🌝🌝새방 만듬:: ', newRoom)

      // 새로운 채팅방 정보를 상태에 추가
      if (newRoom) {
        // setChatLists((prevRooms) => [...prevRooms, newRoom])
        setChatList((prev) => [...prev, newRoom])
        console.log('새 방 추가됨:', newRoom)
      }

      return newRoom
    }
  }

  useEffect(() => {
    //! 현재 Login한 유저 id
    const userInfo = localStorage.getItem('userInfo')
    setUserInfo(userInfo ? JSON.parse(userInfo) : null)
    setUserId(userInfo ? JSON.parse(userInfo).id : null)

    //! 방정보 가져오기
    const fetchGetRooms = async () => {
      const data = await getRooms()

      setChatList(data) // 리코일 값
    }
    fetchGetRooms()
  }, [chatList.length]) // 이렇게 하지 않으니, 대화상대를 인식하지 못함

  useEffect(() => {
    const fetchGetGuideServices = async () => {
      const data = await getGuideServices(Number(id))
      console.log('🌝🌝data: ', data)
      setGuideServices(data)
    }

    fetchGetGuideServices()
  }, [id])

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 점수 평균
  const [averageCommunicationScore, setAverageCommunicationScore] = useState(0)
  const [averageKindnessScore, setAverageKindnessScore] = useState(0)
  const [averageLocationScore, setAverageLocationScore] = useState(0)

  // 🟡 각각의 전체 평점 🟡
  const [reviewCounts, setReviewCounts] = useState([0, 0, 0, 0, 0])
  // console.log('reviewCounts: ', reviewCounts)

  // 플랜 여닫이 상태
  const [isPlanOpen, setIsPlanOpen] = useState<boolean[]>([])

  // 채팅창
  const [isOpenChat, setIsOpenChat] = useState<boolean>(false)

  // * 채팅하기
  const startChatHandler = () => {
    // 1. 로그인 안되어 있으면 로그인 해라고 알려주기
    if (!localStorage.getItem('userInfo')) {
      toast.error('로그인이 필요한 기능입니다.')
      return
    }
    // 2. 채팅 모달창 띄우기
    setIsOpenChat((prev) => !prev)
  }

  /* 🟡 가이드 정보 🟡 */
  const [guideInfos, setguideInfos] = useState({
    gender: '',
    avatar: '',
    nickname: '',
    birthdate: '',
    guideProfile: {
      service: '',
      temperature: '',
      phoneNumber: '',
      verifiedID: false,
      verifiedBankAccount: false,
    },
    tags: [],
    plans: [],
  })
  console.log('⭐️guideInfos: ', guideInfos)
  console.log('⭐️guideInfos: ', guideInfos)

  /* 가이드 리뷰 */
  const [reviews, setReviews] = useState<Review[]>([])

  /* 플랜 드롭다운 함수 */
  const onClickDropdownBtn = (index: number) => {
    setIsPlanOpen((prev) => {
      const newState = [...prev]
      newState[index] = !newState[index]
      return newState
    })
  }

  /* 플랜 개수 만큼 여닫이 생태 관리 */
  const initPlanStates = () => {
    setIsPlanOpen(Array(3).fill(false))
  }

  useEffect(() => {
    //* 1. 가이드 정보 가져오기
    const fetchGetSelectedGuide = async () => {
      const data = await getSelectedGuide(Number(id))
      console.log('data: ', data)
      setguideInfos(data)
    }
    fetchGetSelectedGuide()

    // 2. 리뷰 정보
    const fetchGetReviews = async () => {
      const data = await getReviews(Number(id))
      // console.log('🟡 가이드 리뷰 데이터: ', data)

      // 리뷰별 각각의 점수들의 총합
      let totalCommunication = 0,
        totalKindness = 0,
        totalLocation = 0

      // 점수별 리뷰 카운트를 저장할 새 배열
      let newReviewCounts = [0, 0, 0, 0, 0]
      //! s
      data.forEach((review: any) => {
        totalCommunication += review.communicationScore
        totalKindness += review.kindnessScore
        totalLocation += review.locationScore

        const averageScore = Math.round((review.communicationScore + review.kindnessScore + review.locationScore) / 3)
        if (averageScore >= 1 && averageScore <= 5) {
          newReviewCounts[averageScore - 1]++
        }
      })
      setReviewCounts(newReviewCounts) // 한 번의 업데이트로 모든 카운트 적용

      // 리뷰 정보 평균을 계산
      const numReviews = data.length
      if (numReviews > 0) {
        setAverageCommunicationScore(Number((totalCommunication / numReviews).toFixed(1)))
        setAverageKindnessScore(Number((totalKindness / numReviews).toFixed(1)))
        setAverageLocationScore(Number((totalLocation / numReviews).toFixed(1)))
      }
      setReviews(data)
    }
    fetchGetReviews()
  }, [id])

  // 테스트
  const myDivRef = useRef<HTMLDivElement | null>(null)
  const serviceContent =
    '韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K-pop、ショッピング、カフェ、観光、どれも得意です！韓国ソウル・ソウル郊外の現地人向けカフェやグルメ店を訪れるのが趣味です。旅行者向けよりは現地で人気のホットプレイスを探して回っています。オンラインショップを運営しているので、商品購入代行など、お任せください！特技は最低価格を探すことです^^ ドライブが趣味ですので、送迎などもお任せください。'

  // 최상단 이동 버튼
  const MoveTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 코멘트
  const [visibleComments, setvisibleComments] = useState(3)
  const ADDCOMMENT = 3

  // 코멘트 더보기
  const showMoreComments = () => {
    const newVisibleCount = visibleComments + ADDCOMMENT
    if (newVisibleCount < reviews.length) {
      setvisibleComments(newVisibleCount)
    } else {
      // 모든 리뷰를 보여주고 있을 때 추가로 더 불러올 리뷰가 없으면 최대 리뷰 개수로 설정
      setvisibleComments(reviews.length)
    }
  }

  /* 우측 이동 메뉴 */
  const travelPlanRef = useRef<HTMLDivElement>(null)
  const serviceRef = useRef<HTMLDivElement>(null)
  const reviewRef = useRef<HTMLDivElement>(null)
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 온도 퍼센트 계산
  const calculateTemperatureHeight = () => {
    const temp = Number(guideInfos.guideProfile.temperature)
    const maxTemp = 70
    const minTemp = -10
    const normalizedTemp = Math.min(Math.max(temp, minTemp), maxTemp) // 범위 내로 제한
    return ((normalizedTemp - minTemp) / (maxTemp - minTemp)) * 100 + '%' // 퍼센트로 변환
  }

  // 나이계산
  const calculateAge = (birthdate: string) => {
    return moment().diff(moment(birthdate), 'years')
  }
  return (
    <>
      <Layout>
        {/* ------------------------------------------　左　 ------------------------------------------ */}
        <LeftSection>
          {/* 🟡 가이드 정보 CARD */}
          <GuideInfoCard ref={myDivRef}>
            <ImageAndTemperatureContainer>
              {/* 이미지 */}
              <GuideImageWrapper>
                <UserImageLayout>
                  <GenderMarker $gender={guideInfos.gender} />
                  <img src={guideInfos.avatar ? guideInfos.avatar : userImage} alt="Img" />
                </UserImageLayout>
              </GuideImageWrapper>
              {/* 온도 */}
              <TemperatureContainer>
                {guideInfos.guideProfile.temperature}C
                <TemperatureWrapper>
                  <TemperatureBar>
                    <Temperature $height={calculateTemperatureHeight()} />
                  </TemperatureBar>
                </TemperatureWrapper>
              </TemperatureContainer>
            </ImageAndTemperatureContainer>

            {/* 이름 */}
            <NameAgeWapper>
              <UserName>{guideInfos.nickname}</UserName>
              <UserAge>{`${calculateAge(guideInfos.birthdate)}세`}</UserAge>
            </NameAgeWapper>
            {/* SNS */}
            <SnsWrapper>
              <IconWrapper>
                <XIcon $width="0.7rem" $height="0.7rem" />
              </IconWrapper>
              <IconWrapper>
                <InstagramIcon $width="0.7rem" $height="0.7rem" />
              </IconWrapper>
            </SnsWrapper>
            {/* 인증 */}
            <AutentificationWrapper>
              {/* 휴대폰 인증 */}
              {guideInfos.guideProfile.phoneNumber && (
                <Autentification>
                  <Method>{`휴대폰`}</Method>
                  <AuthIcon $width="0.3rem" $height="0.3rem" />
                </Autentification>
              )}

              {/* 신분증 인증 */}
              {guideInfos.guideProfile.verifiedID && (
                <Autentification>
                  <Method>{`신분증`}</Method>
                  <AuthIcon $width="0.3rem" $height="0.3rem" />
                </Autentification>
              )}
              {/* 계좌 인증 */}
              {guideInfos.guideProfile.verifiedBankAccount && (
                <Autentification>
                  <Method>{`계좌`}</Method>
                  <AuthIcon $width="0.3rem" $height="0.3rem" />
                </Autentification>
              )}
            </AutentificationWrapper>

            {/* 성별, 가이드 횟수 , 사용언어 */}
            <InfoContainer>
              <InfoWrapper>
                <InfoTitle>{`성별`}</InfoTitle>
                <InfoValue>{guideInfos.gender === 'MALE' ? '남' : '여'}</InfoValue>
              </InfoWrapper>
              <InfoWrapper>
                {/* FIXME: 가이드 횟수 없음 */}
                <InfoTitle>{`가이드 횟수`}</InfoTitle>
                <InfoValue>없음{}회</InfoValue>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>{`사용 언어`}</InfoTitle>
                <InfoValue>일본어, 한국어{}</InfoValue>
              </InfoWrapper>
            </InfoContainer>

            {/* 채팅 버튼 */}
            <ChatBtnWrapper>
              <ChatButton
                onClick={() => {
                  startChatHandler(),
                    createRoomHandler(),
                    setIsClickAtChat((prev) => ({
                      ...prev,
                      isClicked: false,
                    }))
                }}
              >
                <ChatIcon style={{ width: '1.5rem', height: '1.5rem', fill: 'white' }} />
                채팅하기
              </ChatButton>
            </ChatBtnWrapper>
            {/* FIXME:  {isOpenChat && <Chatting onClick={openChatHandler} />} */}

            {/* 팔로우 신고하기 */}
            <FollowReportWrapper>
              <Follow
                onClick={() => {
                  true
                    ? toast.success(`${guideInfos.nickname}님을 팔로우 했습니다!`)
                    : toast.success(`${guideInfos.nickname}님을 팔로우 취소 했습니다!`)
                }}
              >
                <FollowIcon $width="20px" $height="20px" $fill="blue" />
                {true ? '찜하기' : '내 가이드'}
              </Follow>
              <Report onClick={() => toast.error(`${guideInfos.nickname}님을 신고 했습니다!`, { icon: false })}>
                <CautionIcon $width={'20px'} $height={'20px'} />
                신고
              </Report>
            </FollowReportWrapper>

            {/* 구분선 */}
            <SeparatorLine />

            {/* 태그 */}
            <TagWrapper>
              {guideInfos.tags.map((tag) => (
                <Tag key={tag}>#{tag}</Tag>
              ))}
              {/* <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dscdscdsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag>
              <Tag>#{`dsc`}</Tag> */}
            </TagWrapper>
          </GuideInfoCard>
        </LeftSection>

        {/* ------------------------------------------　中 ------------------------------------------　*/}
        {isOpenChat && <Chatting userInfo={userInfo} guideInfos={guideInfos} onClick={startChatHandler} />}
        <MiddleSection>
          <BlankTop10Rem />
          {/* FIXME: 1. 서비스  => null 값임*/}
          <IntroLayout>
            <Title>소개</Title>
            {guideInfos.guideProfile.service}
            {/* <ImageContainer>
              <IntroImageWrapper>
                <img src={seoul} />
              </IntroImageWrapper>
              <IntroImageWrapper>
                <img src={busan} />
              </IntroImageWrapper>
              <IntroImageWrapper>
                <img src={ulsan} />
              </IntroImageWrapper>
            </ImageContainer>
            <IntroContent>{serviceContent}</IntroContent> */}
          </IntroLayout>
          {/* FIXME: 1. 서비스 */}

          <Partition>
            <Line />
          </Partition>

          {/* 🟢 서비스 */}
          <ServiceLayout ref={serviceRef}>
            <ServiceContainer>
              <Title>서비스</Title>
              {guideServices?.map((guideService) => (
                <Service key={guideService.name}>
                  <LeftImg>
                    <img src={seoul} alt="" />
                    {/* <img src={guideService.photo} alt="" /> */}
                  </LeftImg>
                  <RightContentWrap>
                    <RightHover>&#62;</RightHover>
                    <RightTitle>{guideService.name}</RightTitle>
                    <RightPricingWrap>
                      요금: <RightPricing>{guideService.price}</RightPricing>
                    </RightPricingWrap>
                    <RightContent>{guideService.description}</RightContent>
                  </RightContentWrap>
                </Service>
              ))}
            </ServiceContainer>
            {/* <ServiceContainer>
              {[1, 2, 3].map((item) => (
                <Service key={item}>
                  <LeftImg>
                    <img src={guideImg} alt="" />
                  </LeftImg>
                  <RightContentWrap>
                    <RightHover>&#62;</RightHover>
                    <RightTitle>{`제목`}</RightTitle>
                    <RightPricingWrap>
                      요금: <RightPricing>{70000}</RightPricing>
                    </RightPricingWrap>
                    <RightContent>
                      그대 보내고 멀리 가을새와 작별하듯 그대 떠나 보내고 돌아와 술잔 앞에 앉으면 눈물 나누나 그대
                      보내고 아주 지는 별빛 바라볼 때 눈에 흘러 내리는 못다한 말들 그 아픈 사랑 지울 수 있을까 어느 하루
                      비라도 추억처럼 흩날리는 거리에서 쓸쓸한 사랑 되어 고개 숙이면 그대 목소리
                    </RightContent>
                  </RightContentWrap>
                </Service>
              ))}
            </ServiceContainer> */}
          </ServiceLayout>

          <Partition ref={travelPlanRef}>
            <Line />
          </Partition>

          {/* 2. 여행 플랜  */}
          <TravelPlanLayout>
            <Title>여행 플랜</Title>
            {guideInfos?.plans.map((plan: Plans) => <PlanItem key={plan.id} data={plan} />)}
          </TravelPlanLayout>
          <Partition>
            <Line />
          </Partition>

          {/* 3. 현재 예약 일정 */}

          <Wrapper>
            <CalendarComponent />
          </Wrapper>

          <Partition>
            <Line />
          </Partition>
          {/* 4. 리뷰 */}
          <ReviewLayout ref={reviewRef}>
            <Title>리뷰</Title>
            <ReviewScoreContainer>
              {/* 🟠 왼쪽 */}
              <ReviewScoreLeft>
                <AverageScore>
                  {((averageCommunicationScore + averageKindnessScore + averageLocationScore) / 3).toFixed()}
                </AverageScore>
                <ScoreListContainer>
                  <ListContainer>
                    <Comunication $width=" 2rem" $height=" 2rem" />
                    <CheckPoint>의사소통</CheckPoint>
                    <CheckScore>{averageCommunicationScore}</CheckScore>
                  </ListContainer>
                  <ListContainer>
                    <CircleCheck $width=" 2rem" $height=" 2rem" />
                    <CheckPoint>친절함</CheckPoint>
                    <CheckScore>{averageKindnessScore}</CheckScore>
                  </ListContainer>
                  <ListContainer>
                    <Location $width=" 2rem" $height=" 2rem" />
                    <CheckPoint>위치</CheckPoint>
                    <CheckScore>{averageLocationScore}</CheckScore>
                  </ListContainer>
                </ScoreListContainer>
              </ReviewScoreLeft>

              {/* FIXME: 오른쪽 */}
              <ReviewScoreRight>
                <ReviewTitleContainer>
                  <ReviewTitle>전체 평점</ReviewTitle>
                  <TotalReviewCount>리뷰수 {reviews.length} 개</TotalReviewCount>
                </ReviewTitleContainer>
                <ScoreBarContainer>
                  {reviewCounts
                    .map((count, index) => {
                      // 전체 리뷰 수 대비 현재 점수의 리뷰 수 비율을 퍼센트로 계산
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0

                      return (
                        <ScoreBarWrapper key={index}>
                          <Rank>{index + 1}점</Rank>
                          <BarWrapper>
                            <Bar percent={percentage} />
                          </BarWrapper>
                          {/* <Count>{count}</Count> */}
                        </ScoreBarWrapper>
                      )
                    })
                    .reverse()}
                </ScoreBarContainer>
              </ReviewScoreRight>
            </ReviewScoreContainer>
            <CommentPartition>
              <CommentLine />
            </CommentPartition>

            {/* 리뷰 */}
            {reviews.slice(0, visibleComments).map((review) => {
              let totalAverage = Number(
                ((review.communicationScore + review.kindnessScore + review.locationScore) / 3).toFixed(),
              )

              return (
                <CommentLayout key={review.id}>
                  {/* 이름 + 국정 + 별 + 일자 */}
                  <CommentContainer>
                    <CommentUserWrapper>
                      {/* <CommentUserName>{review.guide.member.}</CommentUserName> */}
                      {/* FIXME: 누가 썼느지 이름 없음 */}
                      <CommentUserName>{'누가 코멘트를 썻는지 이름이 없음'}</CommentUserName>
                      {/* FIXME: 날짜 다 동일한게 찍히네? */}
                      <Created>{moment(review.createdAt).format('YYYY-MM-DD')}</Created>
                    </CommentUserWrapper>
                    <CommentUserWrapper>
                      <ScoresContainer>
                        <Score>{`전체 평점: ${totalAverage}`}</Score>
                      </ScoresContainer>
                      <ScoresContainer>
                        <Score>{`의사소통: `}</Score>
                        {Array.from({ length: review.communicationScore }, (_, index) => (
                          <Star key={index} $width="20px" $height="20px" $color="var(--color-primary)" />
                        ))}
                      </ScoresContainer>
                      <ScoresContainer>
                        <Score>{`친절함: `}</Score>
                        {Array.from({ length: review.kindnessScore }, (_, index) => (
                          <Star key={index} $width="20px" $height="20px" $color="var(--color-primary)" />
                        ))}
                      </ScoresContainer>
                      <ScoresContainer>
                        <Score>{`위치: `}</Score>
                        {Array.from({ length: review.locationScore }, (_, index) => (
                          <Star key={index} $width="20px" $height="20px" $color="var(--color-primary)" />
                        ))}
                      </ScoresContainer>
                    </CommentUserWrapper>
                  </CommentContainer>
                  <Comment>{review.content}</Comment>
                </CommentLayout>
              )
            })}

            <ButtonWrapper>
              {visibleComments < reviews.length && <ShowMoreButton onClick={showMoreComments}>더보기</ShowMoreButton>}
            </ButtonWrapper>
          </ReviewLayout>
        </MiddleSection>

        {/*　------------------------------------------ 右 ------------------------------------------　*/}
        <RightSection>
          <MenuBanner>
            <MenuTitle>MENU</MenuTitle>
            <MenuItem onClick={() => scrollToRef(serviceRef)}>서비스</MenuItem>
            <MenuItem onClick={() => scrollToRef(travelPlanRef)}>여행플랜</MenuItem>
            <MenuItem onClick={() => scrollToRef(reviewRef)}>리뷰</MenuItem>
            <MoveTopTab onClick={MoveTopClick}>▲ TOP</MoveTopTab>
          </MenuBanner>
        </RightSection>
      </Layout>
    </>
  )
}

export default GuideDetailPage

const Layout = styled.div`
  width: 90%;
  margin: auto;
  min-height: 100vh;
  display: flex;
`
const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Partition = styled(FlexCenterd)`
  width: 100%;
  height: 2px;
  margin: 2rem 0;
`
const Line = styled.div`
  width: 90%;
  height: 2px;
  background-color: #b2b2b2;
`

/* 
   ------------------------------------------　左　------------------------------------------ 
*/
const LeftSection = styled.div`
  /* background-color: #5b5bea; */
  /* flex: 1; */
  width: 20%;
  min-height: 90vh;
`

const GuideInfoCard = styled.div`
  /* background-color: #77f875; */
  /* position: relative; */
  position: sticky;
  top: 15%;
  margin: auto;
  width: 11rem;
  border: 0.2rem solid var(--color-original);
  border-radius: 0.5rem;
  padding: 1rem;
  /* box-sizing: border-box; */
  margin-bottom: 3rem;
`

const ImageAndTemperatureContainer = styled.div`
  background-color: #fff;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`

const GuideImageWrapper = styled.div`
  position: relative;
  margin-right: 10px;
`

const UserImageLayout = styled.div`
  /* background-color: #f2fb68; */
  /* border: 3px solid black; */
  border-radius: 15%;
  width: 7rem;
  height: 7rem;
  /* width: 9rem;
  height: 9rem; */
  overflow: hidden;
  box-shadow: 2px 2px 2px 1.5px gray;

  img {
    width: 100%;
    height: 100%;
  }
`

// const GenderMarker = styled.div`
const GenderMarker = styled.div<{ $gender: string }>`
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-color: ${({ $gender }) => ($gender === 'MALE' ? '#4bb3ff' : '#ff8090')};
  border-radius: 50%;
  top: -15px;
  left: -15px;

  img {
    width: 100%;
    height: 100%;
  }
`

const TemperatureContainer = styled(FlexCenterd)`
  min-width: 1.3rem;
  /* background-color: blue; */
  flex-direction: column;
  font-size: 0.9rem;
`
const TemperatureWrapper = styled(FlexCenterd)`
  /* width: 1.5rem; */
  width: 50%;
  height: 6.3rem;
  /* background-color: #fff048; */
  font-size: 0.7rem;
  transform: rotate(180deg);
`
const TemperatureBar = styled.div`
  width: 0.6rem;
  height: 90%;
  border-radius: 20px;
  border: 2px solid black;
  overflow: hidden;
  /* background-color: #ff6048; */
`

const Temperature = styled.div<{ $height: string }>`
  width: 100%;
  height: ${({ $height }) => $height};
  background-color: var(--color-original);
`

const NameAgeWapper = styled(FlexCenterd)`
  margin-top: 1rem;
  font-size: 1rem;
`

const UserName = styled.div`
  font-size: 1rem;
`
const UserAge = styled.div`
  font-size: 1rem;
  margin-left: 0.5rem;
`
const SnsWrapper = styled(FlexCenterd)`
  gap: 0.5rem;
  margin-top: 1rem;
`
const IconWrapper = styled(FlexCenterd)`
  padding: 0.3rem;
  border: 2px solid var(--color-original);
  border-radius: 0.5rem;
  cursor: pointer;
`
/* 🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡 */
const AutentificationWrapper = styled(FlexCenterd)`
  gap: 0.1rem;
  margin-top: 1rem;
  /* background-color: mediumaquamarine; */
`
const Method = styled.div`
  font-size: 0.6rem;
  min-width: 1.6rem;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
`

const Autentification = styled(FlexCenterd)`
  position: relative;
  /* padding: 0 1px; */
  /* gap: 3px; */
  margin: 0 0.3rem;

  &:not(:first-child)::before {
    content: '';
    display: block;
    position: absolute;
    left: -10px;
    width: 2px;
    height: 20px;
    background-color: black;
    /* margin-right: 0.5rem; */
  }
`
const InfoContainer = styled.div`
  /* background-color: red; */
  margin-top: 1rem;
  font-size: 0.8rem;
  gap: 0.5rem;
  align-items: center;
`

const InfoWrapper = styled(FlexCenterd)`
  /* background-color: #9dff00; */
  margin-top: 1rem;
  font-size: 0.8rem;
  gap: 0.5rem;
  justify-content: space-between;
`

const InfoTitle = styled.div`
  font-weight: 600;
  color: #b2b2b2;
`
const InfoValue = styled.div`
  font-weight: 600;
`

const ChatBtnWrapper = styled(FlexCenterd)`
  width: 100%;
  margin-top: 1.5rem;
  cursor: pointer;
`
const ChatButton = styled(FlexCenterd)`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 6px;
  gap: 20px;
  background-color: var(--color-original);
  color: white;
  box-shadow: 3px 3px 3px gray;
  cursor: pointer;
`
const FollowReportWrapper = styled(FlexCenterd)`
  width: 100%;
  margin-top: 1.5rem;
  /* background-color: blue; */
  justify-content: space-between;
  cursor: pointer;
`

const FollowReport = styled(FlexCenterd)`
  /* flex-basis: 37%; */
  /* flex-basis: 6rem; */
  flex-basis: 50%;
  border: 2px solid #b2b2b2;
  padding: 0.2rem;
  border-radius: 6px;
  gap: 10px;
  font-size: 0.8rem;
  cursor: pointer;
`
const Follow = styled(FollowReport)``
const Report = styled(FollowReport)``

const SeparatorLine = styled.div`
  width: 95%;
  height: 2px;
  background-color: #b2b2b2;
  margin: 1.5rem auto;
`
const TagWrapper = styled(FlexCenterd)`
  display: flex;
  justify-content: flex-start;
  /* align-items: center; */
  flex-wrap: wrap;
  gap: 0.2rem;
`

const Tag = styled.div`
  text-align: center;
  display: inline-block;
  border: 2px solid black;
  border-radius: 2rem;
  padding: 0.1rem 0.3rem;
  min-width: 1.7rem; // 이 줄을 추가하여 최소 너비를 설정합니다.
  white-space: nowrap;
  background-color: white;
`
/* 

   ------------------------------------------　🟡 中 🟡 ------------------------------------------　

   */
const MiddleSection = styled.div`
  /* background-color: #75aef8; */
  /* flex: 3; */
  width: 70%;
  min-height: 90vh;
`
const BlankTop10Rem = styled.div`
  width: 100%;
  height: 10rem;
  /* background-color: red; */
  /* margin-bottom: 3rem; */
`

const MiddleLayout = styled.div`
  /* background-color: #fdd049; */
  width: 100%;
  padding: 0 3rem;
  box-sizing: border-box;
  margin-bottom: 3rem;
  position: relative;
`

// 1. 소개
const IntroLayout = styled(MiddleLayout)`
  margin: auto;
  width: 100%;
`

export const Title = styled.div`
  width: 100%;
  /* background-color: red; */
  min-height: 1.5rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

// 서비스
const ServiceLayout = styled(MiddleLayout)``

const ServiceContainer = styled(FlexCenterd)`
  /* background-color: #6bf37f; */
  gap: 2rem;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 0.5rem;
`

const LeftImg = styled(FlexCenterd)`
  width: 20%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  overflow: hidden;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
`

const RightHover = styled(FlexCenterd)`
  width: 3%;
  height: 100%;
  position: absolute;
  background-color: var(--color-original);
  color: white;
  top: 0;
  right: -50px;
  border-radius: 0 10px 10px 0;
  /* opacity: 0; */
  transition: 0.5s ease;
`

const Service = styled.div`
  position: relative;
  /* background-color: yellow; */
  width: 80%;
  height: 10rem;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  border: 1px solid #e2e1e1;
  box-shadow: 1px 1px 4px #bfbebe;
  overflow: hidden;

  &:hover {
    transition: box-shadow 0.5s ease;
    box-shadow: 5px 5px 4px #a2a1a1;

    ${LeftImg} img {
      transform: scale(1.1); /* 10% 크게 */
      transition: transform 0.5s ease;
    }

    ${RightHover} {
      right: 0;
      opacity: 1;
    }
  }
`

const RightContentWrap = styled.div`
  /* width: 75%; */
  width: 75%;
  padding: 1rem 0.7rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;

  /* 스크롤바 넓이 */
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* 스크롤바 트랙 */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 30px;
  }

  /* 스크롤바 */
  &::-webkit-scrollbar-thumb {
    background: #ffa43a;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`
const RightTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`
const RightPricingWrap = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const RightPricing = styled.span`
  color: #ffa43a;
`
const RightContent = styled.div`
  width: 100%;
  font-size: 0.8rem;
  line-height: 1.2rem;
  overflow-wrap: break-word;
`

// 2. 여행 플랜
const TravelPlanLayout = styled(MiddleLayout)`
  /* background-color: #f2618aff; */
  width: 99%;
  margin: auto;
  gap: 1rem;
`

const PlanContainer = styled(FlexCenterd)`
  /* background-color: #6bf37f; */
  gap: 4rem;
  width: 100%;
  flex-direction: column;
  /* box-sizing: border-box; */
  border-radius: 0.5rem;
`
const PlanWrapper = styled(PlanContainer)`
  /* gap: 3rem; */
`
const Plan = styled(FlexCenterd)`
  background-color: var(--color-original);
  width: 90%;
  height: 3rem;
  /* border: 3px solid black; */
  box-shadow: 4px 4px 4px #a2a1a1;
  border-radius: 1rem;
  padding: 1rem 2rem;
  box-sizing: border-box;
  justify-content: flex-start;
  cursor: pointer;
  z-index: 2;
  /* position: relative; */
  color: white;
  /* gap: 1rem; */
`
const PlanTitle = styled.div`
  /* flex-basis: 50%; */
  /* margin-right: 2rem; */
  /* background-color: mediumaquamarine; */
  width: 40%;

  font-size: 1.5rem;
`
const PlanInfo = styled.div`
  width: 120%;
  /* background-color: #f5c951; */
  margin-right: 3rem;
  font-size: 1rem;
`
const PlanTime = styled.div`
  width: 100%;
  font-size: 1.5rem;
`
const DropdownBtn = styled(FlexCenterd)`
  width: 100%;
  justify-content: flex-end;
`

const PlanContent = styled.div<{ $isPlanOpen: boolean }>`
  display: ${({ $isPlanOpen }) => ($isPlanOpen ? 'block' : 'none')};
  width: 87%;
  min-height: 10rem;
  border: 3px solid black;
  border-radius: 0 0 1rem 1rem;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  top: -4rem;
  opacity: ${({ $isPlanOpen }) => ($isPlanOpen ? '1' : '0')};
  transition: top 0.7s ease;
`
const ContentFrame = styled(FlexCenterd)`
  /* background-color: #ffed4e; */
  /* margin: 1rem 0; */
  min-width: 100%;
  justify-content: space-around;
  /* min-height: 10rem; */
`

const TravelTime = styled(ContentFrame)`
  justify-content: flex-start;
  padding-left: 9rem;
  box-sizing: border-box;
  margin: 1rem 0;
  position: relative;
  /* background-color: blue; */

  &::after {
    content: '';
    position: absolute;
    display: block;
    /* left: 0px; */
    top: 1.7rem;
    left: 9.5rem;
    /* left: 0.5rem; */
    width: 1px;
    height: 20px;
    background-color: black;
    border: 1px solid black;
  }
  &::before {
    content: '';
    position: absolute;
    display: block;
    /* left: 0px; */
    top: -1.4rem;
    left: 9.5rem;
    /* left: 0.5rem; */
    width: 1px;
    height: 20px;
    background-color: black;
    border: 1px solid black;
  }
`

const LocationImage = styled(FlexCenterd)`
  width: 15rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 0.8rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const LocationInfoContainer = styled(FlexCenterd)`
  flex-direction: column;
  gap: 1rem;
  /* background-color: blue; */
`

const InfoTime = styled(FlexCenterd)`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 1rem;
  justify-content: flex-start;
  /* background-color: #7af060; */
`

const InfoName = styled(FlexCenterd)`
  width: 100%;
  margin-bottom: 1rem;
  flex-direction: column;
`
const Place = styled.div`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 0.3rem;
`
const PlaceName = styled.div`
  width: 100%;
  font-size: 1rem;
  margin-bottom: 0.3rem;
  font-size: 1.2rem;
`

const Description = styled.div`
  background-color: #90909026;
  height: 10rem;
  width: 17rem;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 0.7rem;
  border-radius: 0.5rem;
  overflow: auto;
  overflow-wrap: break-word;
  line-height: 1.3rem;
  /* word-break: break-all; */
  /* white-space: nowrap; */
`

const CustomDot = styled.div`
  width: 15px;
  height: 15px;
  background-color: var(--color-original);
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  top: -20px;
`

const Wrapper = styled(FlexCenterd)`
  width: 100%;
  /* height: 45rem; */
`

const ReviewLayout = styled(MiddleLayout)`
  /* background-color: #f2618aff; */
`

const ReviewScoreContainer = styled(FlexCenterd)`
  /* background-color: #6ff178; */
  /* padding: 1rem;
  box-sizing: border-box; */
`

const ReviewScoreLeft = styled(FlexCenterd)`
  /* background-color: #e94242; */
  flex: 3;
  /* min-height: 25rem; */
  flex-direction: column;
`

const AverageScore = styled.div`
  /* background-color: #96fe5e; */
  font-size: 3rem;
  margin-bottom: 2rem;
`
const ScoreListContainer = styled(FlexCenterd)`
  /* background-color: #f9fe5e; */
  width: 100%;
  /* height: 2rem; */
`
const ListContainer = styled(FlexCenterd)`
  flex-direction: column;
  gap: 1rem;
  /* background-color: #fcaa45; */
  width: 100%;
  /* height: 2rem; */
  position: relative;
  &:not(:last-child)::before {
    content: '';
    display: block;
    width: 2px;
    height: 100px;
    background-color: black;
    position: absolute;
    left: 100%;
  }
`

const CheckPoint = styled(FlexCenterd)`
  font-size: 1rem;
`
const CheckScore = styled(FlexCenterd)`
  font-size: 1rem;
`

const ReviewScoreRight = styled.div`
  /* background-color: blue; */
  flex: 4;
  padding: 1rem;
  /* box-sizing: border-box; */
  min-height: 5rem;
`

const ReviewTitleContainer = styled(FlexCenterd)`
  /* justify-content: flex-start; */
  /* padding: 1rem;
  box-sizing: border-box; */
`

const ReviewTitle = styled(Title)`
  width: 20%;
  font-size: 1.2rem;
  /* background-color: #fcaa45; */
  margin-bottom: 0;
`
const TotalReviewCount = styled(Title)`
  font-size: 1rem;
  color: #767676;
  margin-bottom: 0;
`

const ScoreBarContainer = styled(FlexCenterd)`
  /* background-color: #f9fe5e; */
  width: 70%;
  /* min-height: 20rem; */
  /* padding: 1rem; */
  box-sizing: border-box;
  flex-direction: column;
`

const ScoreBarWrapper = styled(FlexCenterd)`
  /* background-color: #c2c0ff; */
  width: 100%;
  /* min-height: 20rem; */
  padding: 0.3rem;
  box-sizing: border-box;
  /* flex-direction: column; */
  gap: 1rem;
`

const Rank = styled(FlexCenterd)`
  font-size: 1em;
  /* background-color: #fbb2b2; */
  flex: 1;
`
const BarWrapper = styled.div`
  flex: 10;
  width: 100%;
  border-radius: 10px;
  background-color: #efefef;
  overflow: hidden;
`
const Bar = styled.div<{ percent: number }>`
  min-height: 0.5rem;
  width: ${({ percent }) => `${percent}%`};
  background-color: var(--color-original);
`

const CommentPartition = styled(FlexCenterd)`
  width: 100%;
  height: 2px;
  margin: 2rem 0;
`
const CommentLine = styled.div`
  width: 80%;
  height: 2px;
  background-color: #b2b2b2;
`

const CommentLayout = styled.div`
  width: 100%;
  /* background-color: #f9fe5e; */
  padding: 1rem;
  box-sizing: border-box;
  /* gap: 1rem; */
  display: flex;
  flex-direction: column;
`
const CommentContainer = styled.div`
  width: 100%;
  /* background-color: #5efeab; */
  padding: 1rem;
  box-sizing: border-box;
  /* gap: 1rem; */
  display: flex;
  flex-direction: column;
`

const CommentUserWrapper = styled(FlexCenterd)`
  font-size: 1rem;
  justify-content: flex-start;
`
const CommentUserName = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`
const ScoresContainer = styled(FlexCenterd)`
  justify-content: flex-start;
  /* gap: 1.5rem; */
  margin: 0.5rem 2rem 0.5rem 0;
`
const Score = styled.span`
  font-size: 1rem;
  /* color: var(--color-original); */
`

const Created = styled.div`
  font-size: 0.7rem;
`
// const Country = styled.div`
//   font-size: 0.7rem;
// `
const Comment = styled.div`
  margin-top: -30px;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.5rem;
`
const ButtonWrapper = styled(FlexCenterd)``
const ShowMoreButton = styled.button`
  width: 4rem;
  height: 4rem;
  border: 0;
  border-radius: 50%;
  background-color: var(--color-original);
  color: white;
  font-size: 1rem;
  cursor: pointer;

  box-shadow: 3px 3px 3px 3px gray;
`

/*

　  ------------------------------------------ 右 ------------------------------------------　

*/
const RightSection = styled.div`
  /* flex: 0.2; */
  width: 10%;
  /* min-height: 80vh; */
  /* background-color: #ff70c4; */
`

const MenuBanner = styled.div`
  /* background-color: #77f875; */
  width: 6rem;
  position: sticky;
  top: 40%;
  margin: auto;
  /* min-width: 2rem; */
  border: 0.1rem solid var(--color-original);
  border-radius: 0.5rem;
  /* margin-right: 2rem; */
`
const MenuTitle = styled(FlexCenterd)`
  width: 100%;
  height: 3rem;
  color: white;
  font-size: 0.8rem;
  background-color: var(--color-original);
`
const MoveTopTab = styled(MenuTitle)`
  cursor: pointer;
`
const MenuItem = styled(FlexCenterd)`
  padding: 1rem 0;
  width: 100%;
  font-size: 0.8rem;
  flex-wrap: wrap;
  position: relative;
  cursor: pointer;
  /* border-bottom: 1px solid var(--color-original); */

  &:nth-child(n + 3)::before {
    content: '';
    width: 60%;
    height: 1px;
    background-color: var(--color-original);
    position: absolute;
    top: -0.2rem;
  }
`

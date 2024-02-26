import styled from 'styled-components'
import guideImg from 'assets/guideImg.png'
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
import { motion } from 'framer-motion'
import CarIcon from 'components/icons/CarIcon'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import CircleCheck from 'components/icons/CircleCheck'
import Comunication from 'components/icons/Comunication'
import Location from 'components/icons/Location'
import Star from 'components/icons/Star'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

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

const comments = [
  {
    id: 1,
    user: 'Oba honoka',
    country: 'japan',
    star: 4,
    comment: '風に戸惑う弱気な僕は通りすがるあの日の幻影本当は見た目以上涙もろい過去がある',
  },
  {
    id: 2,
    user: 'Yamatsu asuka',
    country: 'japan',
    star: 2,
    comment: '止めど流る清か水よ消せど燃ゆる魔性の火よあんなに好きな女性に出逢う夏は二度とない',
  },
  {
    id: 3,
    user: 'Wada sayaka',
    country: 'japan',
    star: 5,
    comment: '人は誰も愛求めて 闇に彷徨う運命 そして風まかせ oh, my destiny 涙枯れるまで',
  },
  {
    id: 4,
    user: 'Tsuki saeko',
    country: 'japan',
    star: 1,
    comment:
      '見つめ合うと素直にお喋り出来ない 津波のような侘しさに I know... 怯えてる めぐり逢えた瞬間から 魔法が解けない 鏡のような夢の中で 思い出はいつの日も雨',
  },
  {
    id: 5,
    user: 'Hasegawa ryo',
    country: 'japan',
    star: 4,
    comment: '夢が終わり目覚める時深い闇に夜明けが来る本当は見た目以上打たれ強い僕がいる',
  },
  {
    id: 6,
    user: 'Simizu reina',
    country: 'japan',
    star: 5,
    comment: '泣き出しそうな空眺めて 波に漂うカモメ きっと世は情け oh, sweet memory 旅立ちを胸に',
  },
  {
    id: 7,
    user: 'Katou yuu',
    country: 'japan',
    star: 4,
    comment: '人は涙見せずに大人になれない ガラスのような恋だとは I know... 気付いてる',
  },
  {
    id: 8,
    user: 'Suzuki ichiro',
    country: 'japan',
    star: 4,
    comment: '身も心も愛しい女性しか見えない張り裂けそうな胸の奥で悲しみに耐えるのは何故',
  },
  {
    id: 9,
    user: 'Abe kazuki',
    country: 'japan',
    star: 3,
    comment: '見つめ合うと素直に お喋り出来ない 津波のような侘しさに I know... 怯えてる',
  },
  {
    id: 10,
    user: 'Akutagawa saburo',
    country: 'japan',
    star: 4,
    comment:
      'めぐり逢えた瞬間から死ぬまで好きと言って 鏡のような夢の中で 微笑をくれたのは誰 好きなのに泣いたのは何故 思い出はいつの日も... 雨',
  },
]

const GuideDetailPage = () => {
  const [isPlanOpen, setIsPlanOpen] = useState<boolean[]>([])

  const onClickDropdownBtn = (index: number) => {
    setIsPlanOpen((prev) => {
      const newState = [...prev]
      newState[index] = !newState[index]

      return newState
    })
  }

  const initPlanStates = () => {
    setIsPlanOpen(Array(3).fill(false))
  }

  useEffect(() => {
    initPlanStates()
  }, [plans.length])

  // 테스트
  const myDivRef = useRef<HTMLDivElement | null>(null)
  const serviceContent =
    '韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K-pop、ショッピング、カフェ、観光、どれも得意です！韓国ソウル・ソウル郊外の現地人向けカフェやグルメ店を訪れるのが趣味です。旅行者向けよりは現地で人気のホットプレイスを探して回っています。オンラインショップを運営しているので、商品購入代行など、お任せください！特技は最低価格を探すことです^^ ドライブが趣味ですので、送迎などもお任せください。'

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      // 스크롤 변화에 대한 추가적인 처리를 수행할 수 있습니다.
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const MoveTopClick = () => {
    const { scrollY } = window
    console.log('현재 scrollY: ', scrollY)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [value, onChange] = useState<Value>(new Date())

  // 특정 날짜
  const targetDates = [new Date(2024, 1, 5), new Date(2024, 1, 10), new Date(2024, 1, 15), new Date(2024, 2, 2)]

  // tileContent 함수 정의
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && targetDates.some((targetDate) => date.getTime() === targetDate.getTime())) {
      return <CustomDot />
    }
    return null
  }

  const [visibleComments, setvisibleComments] = useState(5)
  const ADDCOMMENT = 5

  const showMoreComments = () => {
    setvisibleComments(visibleComments + ADDCOMMENT)
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
                  <GenderMarker />
                  <img src={guideImg} alt="Img" />
                </UserImageLayout>
              </GuideImageWrapper>
              {/* 온도 */}
              <TemperatureContainer>
                {`36.5`}C
                <TemperatureWrapper>
                  <TemperatureBar>
                    <Temperature height="60%" />
                  </TemperatureBar>
                </TemperatureWrapper>
              </TemperatureContainer>
            </ImageAndTemperatureContainer>

            {/* 이름 */}
            <NameAgeWapper>
              <UserName>{`최소라`}</UserName>
              <UserAge>{`31세`}</UserAge>
            </NameAgeWapper>
            {/* SNS */}
            <SnsWrapper>
              <IconWrapper>
                <XIcon width="1rem" height="1rem" />
              </IconWrapper>
              <IconWrapper>
                <InstagramIcon width="1.1rem" height="1.1rem" />
              </IconWrapper>
            </SnsWrapper>
            {/* 인증 */}
            <AutentificationWrapper>
              <Autentification>
                <Method>{`휴대폰`}</Method>
                <AuthIcon width="1rem" height="1rem" />
              </Autentification>
              <Autentification>
                <Method>{`신분증`}</Method>
                <AuthIcon width="1rem" height="1rem" />
              </Autentification>
              <Autentification>
                <Method>{`계좌`}</Method>
                <AuthIcon width="1rem" height="1rem" />
              </Autentification>
            </AutentificationWrapper>

            {/* 성별, 가이드 횟수 , 사용언어 */}
            <InfoContainer>
              <InfoWrapper>
                <InfoTitle>{`성별`}</InfoTitle>
                <InfoValue>여{}</InfoValue>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>{`가이드 횟수`}</InfoTitle>
                <InfoValue>25{}회</InfoValue>
              </InfoWrapper>
              <InfoWrapper>
                <InfoTitle>{`사용 언어`}</InfoTitle>
                <InfoValue>일본어, 한국어{}</InfoValue>
              </InfoWrapper>
            </InfoContainer>

            {/* 채팅 버튼 */}
            <ChatBtnWrapper>
              <ChatButton>
                <ChatIcon width={'50px'} heigth={'50px'} fill={'white'} />
                채팅하기
              </ChatButton>
            </ChatBtnWrapper>

            {/* 팔로우 신고하기 */}
            <FollowReportWrapper>
              <Follow>
                <FollowIcon width={'30px'} heigth={'30px'} />
                팔로우
              </Follow>
              <Report>
                <CautionIcon width={'20px'} heigth={'20px'} />
                신고
              </Report>
            </FollowReportWrapper>

            {/* 구분선 */}
            <SeparatorLine />

            {/* 태그 */}
            <TagWrapper>
              <Tag>#{`dsc`}</Tag>
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
              <Tag>#{`dsc`}</Tag>
            </TagWrapper>
          </GuideInfoCard>
        </LeftSection>

        {/* ------------------------------------------　中 ------------------------------------------　*/}
        <MiddleSection>
          <BlankTop10Rem />
          {/* 1. 서비스 */}
          <ServiceLayout>
            <Title>서비스</Title>
            <ImageContainer>
              <ServiceImageWrapper>
                <img src={seoul} />
              </ServiceImageWrapper>
              <ServiceImageWrapper>
                <img src={busan} />
              </ServiceImageWrapper>
              <ServiceImageWrapper>
                <img src={ulsan} />
              </ServiceImageWrapper>
            </ImageContainer>
            <ServiceContent>{serviceContent}</ServiceContent>
          </ServiceLayout>
          <Partition>
            <Line />
          </Partition>
          {/* 2. 여행 플랜  */}
          <TravelPlanLayout>
            <Title>여행 플랜</Title>
            <PlanContainer>
              {plans.map((plan, index) => {
                return (
                  <>
                    <PlanWrapper>
                      <Plan key={index} onClick={() => onClickDropdownBtn(index)}>
                        <PlanTitle>{`플랜1`}</PlanTitle>
                        <PlanInfo>{`서울에서 하는 조선시대 역사 체험`}</PlanInfo>
                        <PlanTime>
                          <Time $width="1.1rem" $height="1.1rem" $color="white" />
                          {` 총 ${6} 시간`}
                        </PlanTime>
                        <DropdownBtn>
                          {isPlanOpen[index] ? (
                            <Arrow $width="3rem" $height="3rem" $color="white" $angle="90deg" />
                          ) : (
                            <Arrow $width="3rem" $height="3rem" $color="white" $angle="180deg" />
                          )}
                        </DropdownBtn>
                      </Plan>
                      {/* 플랜 내용 */}
                      <PlanContent isPlanOpen={isPlanOpen[index]}>
                        {plan.locations.map((location, index) => {
                          return (
                            <>
                              <ContentFrame>
                                <LocationImage>
                                  <img src={ulsan} alt="Noimage" />
                                </LocationImage>
                                <LocationInfoContainer>
                                  <InfoTime>
                                    <Time $width="30px" $height="30px" $color="black" />
                                    {1} 시간
                                  </InfoTime>
                                  <InfoName>
                                    <Place>장소</Place>
                                    <PlaceName> {`83타워`}</PlaceName>
                                  </InfoName>
                                </LocationInfoContainer>
                                <Description>
                                  efiluwahwflihawlefiluwaheiuflhawflihawliefhwialuawflihawliefhwialuhefiluwaheiuflhawflihawliefhwialuhefiluwaheiuflhawflihawliefhwialuhefiluwaheiuflhaweuilfhlawiehfuiawh
                                </Description>
                              </ContentFrame>

                              {index !== plan.locations.length - 1 && (
                                <TravelTime>
                                  <CarIcon width="30px" height="30px" marginRight="10px" />
                                  {`${30} 분  `}
                                </TravelTime>
                              )}
                            </>
                          )
                        })}

                        {/* --------------------------------------------------------- */}
                      </PlanContent>
                    </PlanWrapper>
                  </>
                )
              })}
            </PlanContainer>
          </TravelPlanLayout>
          <Partition>
            <Line />
          </Partition>
          {/* 3. 현재 예약 일정 */}
          <BookingCheckLayout>
            <Title>현재 예약 일정</Title>
            <BookingContainer>
              <CalendarWrapper>
                <Calendar
                  className="react-calendar"
                  onChange={onChange}
                  value={value}
                  calendarType="gregory"
                  formatDay={(locale, date) => moment(date).format('DD')}
                  formatMonthYear={(locale, date) => moment(date).format('YYYY. MM')}
                  tileContent={tileContent} // tileContent 적용
                  next2Label={null}
                  prev2Label={null}
                  // locale="en-EN"
                  // locale="ja-JP"
                  showNeighboringMonth={false}
                />
              </CalendarWrapper>
            </BookingContainer>
          </BookingCheckLayout>
          <Partition>
            <Line />
          </Partition>
          {/* 4. 리뷰 */}
          <ReviewLayout>
            <Title>리뷰</Title>
            <ReviewScoreContainer>
              {/* 🟠 왼쪽 */}
              <ReviewScoreLeft>
                <AverageScore>4.3</AverageScore>
                <ScoreListContainer>
                  <ListContainer>
                    <Comunication width=" 50px" height=" 50px" />
                    <CheckPoint>의사소통</CheckPoint>
                    <CheckScore>4.3</CheckScore>
                  </ListContainer>
                  <ListContainer>
                    <CircleCheck width=" 50px" height=" 50px" />
                    <CheckPoint>정확도</CheckPoint>
                    <CheckScore>4.3</CheckScore>
                  </ListContainer>
                  <ListContainer>
                    <Location width=" 50px" height=" 50px" />
                    <CheckPoint>위치</CheckPoint>
                    <CheckScore>4.3</CheckScore>
                  </ListContainer>
                </ScoreListContainer>
              </ReviewScoreLeft>
              {/* 🟠 🟠오른쪽 */}
              <ReviewScoreRight>
                <ReviewTitleContainer>
                  <ReviewTitle>전체평점</ReviewTitle>
                  <TotalReviewCount>리뷰수 {10} 개</TotalReviewCount>
                </ReviewTitleContainer>
                <ScoreBarContainer>
                  {Array.from({ length: 5 }, (_, index) => (
                    <ScoreBarWrapper key={index}>
                      <Rank>{index + 1}</Rank>
                      <BarWrapper>
                        <Bar percent={40} />
                      </BarWrapper>
                      <Count>200</Count>
                    </ScoreBarWrapper>
                  )).reverse()}
                </ScoreBarContainer>
              </ReviewScoreRight>
            </ReviewScoreContainer>
            <CommentPartition>
              <CommentLine />
            </CommentPartition>

            {/* コメント */}
            {comments.slice(0, visibleComments).map((comment) => {
              return (
                <CommentLayout>
                  {/* 이름 + 국정 + 별 + 일자 */}
                  <CommentContainer>
                    <CommentUserWrapper>
                      <CommentUserName>{comment.user}</CommentUserName>
                      <Country>{comment.country}</Country>
                    </CommentUserWrapper>
                    <CommentUserWrapper>
                      <CommentUserName>
                        {Array.from({ length: comment.star }, (_, index) => (
                          <Star key={index} width="20px" height="20px" fill="var(--color-primary)" />
                        ))}
                      </CommentUserName>
                      <Country>{new Date().toLocaleDateString()}</Country>
                    </CommentUserWrapper>
                  </CommentContainer>
                  <Comment>{comment.comment}</Comment>
                </CommentLayout>
              )
            })}
            <ButtonWrapper>
              {visibleComments !== comments.length && (
                <ShowMoreButton onClick={showMoreComments}>더보기</ShowMoreButton>
              )}
            </ButtonWrapper>
          </ReviewLayout>
        </MiddleSection>
        {/*　------------------------------------------ 右 ------------------------------------------　*/}
        <RightSection>
          <MenuBanner>
            <MenuTitle>MENU</MenuTitle>
            <MenuItem>여행플랜</MenuItem>
            <MenuItem>서비스</MenuItem>
            <MenuItem>리뷰</MenuItem>
            <MoveTopTab onClick={MoveTopClick}>▲ TOP</MoveTopTab>
          </MenuBanner>
        </RightSection>
      </Layout>
    </>
  )
}

export default GuideDetailPage

const Layout = styled.div`
  width: 100%;
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
  margin: 7rem 0;
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
  flex: 1;
  min-height: 90vh;
  /* position: relative; */
`

const GuideInfoCard = styled.div`
  /* background-color: #77f875; */
  /* position: relative; */
  position: sticky;
  top: 15%;
  margin: auto;
  width: 70%;
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
  width: 100%;
  height: 100%;
  /* width: 9rem;
  height: 9rem; */
  overflow: hidden;
  box-shadow: 2px 2px 2px 1.5px gray;

  img {
    width: 100%;
    height: 100%;
  }
`

// const GenderMarker = styled.div<{ sex: string }>`
const GenderMarker = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  /* background-color: ${({ sex }) => (sex === 'male' ? '#4bb3ff' : '#ff8090')}; */
  /* background-color: #4bb3ff; */ // 남자
  background-color: #ff8090; // 여자
  border-radius: 50%;
  top: -15px;
  left: -15px;

  img {
    width: 100%;
    height: 100%;
  }
`

const TemperatureContainer = styled.div`
  min-width: 1.3rem;
  /* background-color: blue; */
  font-size: 0.9rem;
`
const TemperatureWrapper = styled(FlexCenterd)`
  /* width: 1.5rem; */
  width: 100%;
  height: 100%;
  /* background-color: #fff048; */
  font-size: 0.7rem;
  transform: rotate(180deg);
`
const TemperatureBar = styled.div`
  width: 60%;
  height: 90%;
  border-radius: 20px;
  border: 2px solid black;
  overflow: hidden;
  /* background-color: #ff6048; */
`

const Temperature = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: var(--color-original);
`

const NameAgeWapper = styled(FlexCenterd)`
  margin-top: 1rem;
  font-size: 1rem;
`

const UserName = styled.div`
  font-size: 1.5rem;
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
  border-radius: 15px;
  cursor: pointer;
`
const AutentificationWrapper = styled(FlexCenterd)`
  gap: 0.5rem;
  margin-top: 1rem;
`
const Method = styled.div`
  font-size: 0.6rem;
  display: inline-block;
`

const Autentification = styled(FlexCenterd)`
  position: relative;
  padding: 0 5px;
  gap: 5px;
  margin: 0 0.5rem;

  &:not(:first-child)::before {
    content: '';
    display: block;
    position: absolute;
    left: -15px;
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
`
const ChatButton = styled(FlexCenterd)`
  width: 100%;
  font-size: 1.5rem;
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
`

const FollowReport = styled(FlexCenterd)`
  /* flex-basis: 37%; */
  /* flex-basis: 6rem; */
  flex-basis: 50%;
  border: 2px solid #b2b2b2;
  padding: 0.5rem;
  border-radius: 6px;
  gap: 10px;
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
  justify-content: center;
  align-items: center;
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
  flex: 3;
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

// 1. 서비스
const ServiceLayout = styled(MiddleLayout)``

const Title = styled.div`
  width: 100%;
  font-size: 3rem;
  margin-bottom: 3rem;
`
const ImageContainer = styled(FlexCenterd)`
  /* background-color: #ff70c4; */
  width: 100%;
  height: 100%;
  font-size: 3rem;
  justify-content: space-around;
  margin-bottom: 3rem;
`
const ServiceImageWrapper = styled(FlexCenterd)`
  width: 18rem;
  height: 18rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 3px 3px 3px 3px gray;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ServiceContent = styled.div`
  width: 100%;
  font-size: 2rem;
  line-height: 4rem;
  margin-bottom: 3rem;
`

// 2. 여행 플랜
const TravelPlanLayout = styled(MiddleLayout)`
  /* background-color: #f2618aff; */
  height: auto;
`

const PlanContainer = styled(FlexCenterd)`
  /* background-color: #6bf37f; */
  gap: 6rem;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 0.5rem;
  /* margin-bottom: 3rem; */
`
const PlanWrapper = styled(PlanContainer)`
  gap: 0;
`
const Plan = styled(FlexCenterd)`
  background-color: var(--color-original);
  width: 90%;
  /* border: 3px solid black; */
  box-shadow: 4px 4px 4px 4px #a2a1a1;
  border-radius: 1rem;
  padding: 1rem 3rem;
  box-sizing: border-box;
  justify-content: flex-start;
  cursor: pointer;
  z-index: 2;
  /* position: relative; */
  color: white;
`

const PlanTitle = styled.div`
  flex-basis: 70%;
  /* margin-right: 2rem; */
  width: 100%;
  font-size: 3rem;
`
const PlanInfo = styled.div`
  width: 100%;
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

const PlanContent = styled.div<{ isPlanOpen: boolean }>`
  display: ${({ isPlanOpen }) => (isPlanOpen ? 'block' : 'none')};
  /* visibility: ${({ isPlanOpen }) => (isPlanOpen ? 'block' : 'none')}; */
  /* background-color: #408efb; */
  width: 87%;
  min-height: 10rem;
  border: 3px solid black;
  border-radius: 0 0 1rem 1rem;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  top: ${({ isPlanOpen }) => (isPlanOpen ? '0' : '-5rem')};
  opacity: ${({ isPlanOpen }) => (isPlanOpen ? '1' : '0')};
  transition: top 0.7s ease;
`
const ContentFrame = styled(FlexCenterd)`
  /* background-color: #ffed4e; */
  margin: 1rem 0;
  min-width: 100%;
  justify-content: space-around;
  /* min-height: 10rem; */
`

const TravelTime = styled(ContentFrame)`
  justify-content: flex-start;
  padding-left: 9rem;
  box-sizing: border-box;
  margin: 2rem 0;
  position: relative;

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
  width: 17rem;
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
  gap: 2rem;
  background-color: #fff;
`

const InfoTime = styled(FlexCenterd)`
  width: 100%;
  font-size: 1.5rem;
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
  font-size: 1.5rem;
`

const Description = styled.div`
  background-color: #ece8e85a;
  height: 10rem;
  width: 23rem;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1rem;
  border-radius: 0.5rem;
  overflow: auto;
  overflow-wrap: break-word;
  line-height: 1.5rem;
  /* word-break: break-all; */
  /* white-space: nowrap; */
`

// 3. 현재 예약 일정
const BookingCheckLayout = styled(MiddleLayout)`
  /* background-color: #f2618aff; */
  height: auto;
`
const BookingContainer = styled(FlexCenterd)`
  /* background-color: #6ff178; */
  padding: 1rem;
  box-sizing: border-box;
`
const CalendarWrapper = styled(FlexCenterd)`
  width: 100%;
  height: 45rem;

  .react-calendar {
    width: 70%;
    height: 100%;
    font-size: 4rem;
    box-shadow: 5px 5px 5px 10px #e5e5e5;
    border-radius: 10px;
    padding: 30px;
    /* box-sizing: border-box; */

    /* 년도  */
    .react-calendar__navigation button {
      color: #000000;
      min-width: 93px;
      /* background: none; */
      font-size: 30px;
      margin-top: 2.5rem;
    }

    /* 오늘 날짜 */
    .react-calendar__tile--now {
      /* background: var(--color-original); */
      background: #e44921;
      font-weight: bold;
      font-size: 20px;
      color: white !important;
      border-radius: 50%;
      box-shadow: 3px 3px 3px 3px #7b7979;
    }

    /* 일 날짜 색깔 */
    .react-calendar__tile {
      color: black;
      font-size: 17px;
    }

    // 요일 아래 밑줄 제거
    .react-calendar__month-view__weekdays abbr {
      text-decoration: none;
      font-weight: 800;
    }

    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
      background: #e44921;
      /* border-radius: 1px; */
    }

    // 날짜 눌럿을 때
    .react-calendar__tile--active {
      background: #e44921;
      border-radius: 50%;
    }

    /* 요일 라벨 */
    .react-calendar__month-view__weekdays {
      text-align: center;
      font-size: 25px;
      background-color: #fff;
      border-bottom: 1px solid black;
      padding: 0px;
    }
  }
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
  min-height: 25rem;
  flex-direction: column;
`

const AverageScore = styled.div`
  /* background-color: #96fe5e; */
  font-size: 8rem;
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
  font-size: 1.5rem;
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
  width: 60%;
  /* background-color: #fcaa45; */
  margin-bottom: 0;
`
const TotalReviewCount = styled(Title)`
  font-size: 1.5rem;
  color: #767676;
  margin-bottom: 0;
`

const ScoreBarContainer = styled(FlexCenterd)`
  /* background-color: #f9fe5e; */
  width: 100%;
  min-height: 20rem;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
`

const ScoreBarWrapper = styled(FlexCenterd)`
  /* background-color: #c2c0ff; */
  width: 100%;
  /* min-height: 20rem; */
  padding: 1rem;
  box-sizing: border-box;
  /* flex-direction: column; */
  gap: 1rem;
`

const Rank = styled(FlexCenterd)`
  font-size: 2rem;

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
  min-height: 1rem;
  width: ${({ percent }) => `${percent}%`};
  background-color: var(--color-original);
`
const Count = styled(FlexCenterd)`
  flex: 1;
  /* background-color: #0044ff; */
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
const Country = styled.div`
  font-size: 0.7rem;
`
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
  flex: 0.4;
  min-height: 90vh;
  /* background-color: #ff70c4; */
`

const MenuBanner = styled.div`
  /* background-color: #77f875; */
  position: sticky;
  top: 15%;
  margin: auto;
  min-width: 70%;
  border: 0.1rem solid var(--color-original);
  border-radius: 0.5rem;
  margin-right: 2rem;
`
const MenuTitle = styled(FlexCenterd)`
  width: 100%;
  height: 3rem;
  color: white;
  background-color: var(--color-original);
`
const MoveTopTab = styled(MenuTitle)`
  cursor: pointer;
`
const MenuItem = styled(FlexCenterd)`
  padding: 2rem 0;
  width: 100%;
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

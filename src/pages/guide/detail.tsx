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

const GuideDetailPage = () => {
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false)

  const onClickDropdownBtn = () => {
    setIsPlanOpen((prev) => !prev!)
    console.log('isPlanOpen: ', isPlanOpen)
  }

  // 테스트
  const myDivRef = useRef<HTMLDivElement | null>(null)
  const serviceContent =
    '韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K-pop、ショッピング、カフェ、観光、どれも得意です！韓国ソウル・ソウル郊外の現地人向けカフェやグルメ店を訪れるのが趣味です。旅行者向けよりは現地で人気のホットプレイスを探して回っています。オンラインショップを運営しているので、商品購入代行など、お任せください！特技は最低価格を探すことです^^ ドライブが趣味ですので、送迎などもお任せください。'
  useEffect(() => {
    if (myDivRef.current) {
      console.log('Div:', myDivRef.current)
      const divHeight = myDivRef.current.clientHeight
      // console.log('Div 높이:', divHeight)
    }
  }, [])
  // 테스트

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
              <Plan onClick={onClickDropdownBtn}>
                <PlanTitle>{`플랜1`}</PlanTitle>
                <PlanInfo>{`서울에서 하는 조선시대 역사 체험`}</PlanInfo>
                <PlanTime>
                  <Time $width="1.1rem" $height="1.1rem" $color="black" />
                  {` 총 ${6} 시간`}
                </PlanTime>
                <DropdownBtn>
                  {isPlanOpen ? (
                    <Arrow $width="3rem" $height="3rem" $color="black" $angle="90deg" />
                  ) : (
                    <Arrow $width="3rem" $height="3rem" $color="black" $angle="180deg" />
                  )}
                </DropdownBtn>
              </Plan>
              <Plan onClick={onClickDropdownBtn}>
                <PlanTitle>{`플랜1`}</PlanTitle>
                <PlanInfo>{`서울에서 하는 조선시대 역사 체험`}</PlanInfo>
                <PlanTime>
                  <Time $width="1.1rem" $height="1.1rem" $color="black" />
                  {` 총 ${6} 시간`}
                </PlanTime>
                <DropdownBtn>
                  {isPlanOpen ? (
                    <Arrow $width="3rem" $height="3rem" $color="black" $angle="90deg" />
                  ) : (
                    <Arrow $width="3rem" $height="3rem" $color="black" $angle="180deg" />
                  )}
                </DropdownBtn>
              </Plan>
            </PlanContainer>
          </TravelPlanLayout>
          <Partition>
            <Line />
          </Partition>
          {/* 3. 현재 예약 일정 */}
          {/* 4. 리뷰 */}
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
  margin: 3rem 0;
`
const Line = styled.div`
  width: 90%;
  height: 2px;
  background-color: #b2b2b2;
`

/* ------------------------------------------　左　------------------------------------------ */
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
/* ------------------------------------------　🟡 中 🟡 ------------------------------------------　*/
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
  background-color: #f2618aff;
`

const PlanContainer = styled(FlexCenterd)`
  background-color: #6bf37f;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin-bottom: 3rem;
`

const Plan = styled(FlexCenterd)`
  background-color: aquamarine;
  border: 3px solid black;
  border-radius: 1rem;
  width: 90%;
  padding: 1rem 3rem;
  box-sizing: border-box;
  justify-content: flex-start;
  cursor: pointer;
`

const PlanTitle = styled.div`
  flex-basis: 50%;
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

/*　------------------------------------------ 右 ------------------------------------------　*/
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

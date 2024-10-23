import defaultAvatar from '../../assets/default_avatar.webp'
import { styled } from 'styled-components'
import { useSetRecoilState } from 'recoil'
import { RequestGuide } from 'state/store/RequestGuide'

export interface userInfoProps {
  name?: string
  email?: string
  nickname?: string
  phonNum?: string
  avatar?: string
  gender?: string
  password?: string
}

const LeftInfo = ({ name, email, nickname, phonNum, avatar, gender }: userInfoProps) => {
  const setRequestOpend = useSetRecoilState(RequestGuide)
  let userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '')
  console.log('🩷[myPageCommon.LeftInfo] 현재 로그인 유저 정보 :', userInfo)

  return (
    <>
      <InfoContainer>
        <GuideImageWrapper>
          <UserImageLayout>
            <GenderMarker gender={gender} />
            {/* <img src={guideImg} alt="Img" /> */}
            <img src={avatar || defaultAvatar} alt="Img" />
          </UserImageLayout>
        </GuideImageWrapper>
        {/* <Name>{name}</Name> */}
        <InfoMail>{email}</InfoMail>

        <InfoBox>
          <InfoName>닉네임</InfoName>
          <Info>{nickname}</Info>
        </InfoBox>
        <InfoBox>
          <InfoName>연락처</InfoName>
          <Info>{phonNum || '미등록'}</Info>
          {/* <Info>010-1234-1234</Info> */}
        </InfoBox>

        <Application onClick={() => setRequestOpend((prev) => ({ ...prev, isClick: !prev.isClick }))}>
          가이드 신청
        </Application>
      </InfoContainer>
    </>
  )
}

export default LeftInfo

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const InfoContainer = styled(FlexCenterd)`
  /* background-color: #fadb4e; */
  width: 25%;
  height: 100%;
  flex-direction: column;
  border: 0.2rem solid #afafaf79;
  box-shadow: 2px 2px 2px #afafaf79;
  border-radius: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  margin-right: 1rem;
`

const GuideImageWrapper = styled.div`
  position: relative;
  margin-right: 10px;
`

const UserImageLayout = styled.div`
  border-radius: 15%;
  width: 7rem;
  height: 7rem;
  overflow: hidden;
  box-shadow: 2px 2px 2px 1.5px gray;
  img {
    width: 100%;
    height: 100%;
  }
`

const GenderMarker = styled.div<{ gender?: string }>`
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-color: ${({ gender }) => (gender === 'male' ? '#4bb3ff' : '#ff8090')};
  border-radius: 50%;
  top: -15px;
  left: -15px;
  img {
    width: 100%;
    height: 100%;
  }
`

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 2rem 0 1rem 0;
`

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  margin-bottom: 2rem;
`
const InfoName = styled.div``
const InfoMail = styled(InfoName)`
  margin: 2em;
  font-size: 1.5rem;
`
const Application = styled.div`
  margin-top: 3rem;
  color: var(--color-original);
  cursor: pointer;

  &:hover {
    transform: translateX(-0.1rem) translateY(-0.1rem);
    transition: all 0.5s;
  }
`

const Info = styled.div``

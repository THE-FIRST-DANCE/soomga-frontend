import { styled } from 'styled-components'
import BasicInfo from './BasicInfo'
import Review from './Review'
import Posting from './Posting'
import Following from './Following'
import Planing from './Planing'
import Guide from './Guide'
import RequestGuidePage from './RequestGuide'
import { userInfoProps } from './LeftInfo'

interface TagOpenStateProps {
  basicInfo: boolean
  review: boolean
  posting: boolean
  following: boolean
  planing: boolean
  guide: boolean
  requetGuide: boolean
  userInformation: userInfoProps
}

const MainContainer = ({
  basicInfo = true,
  review,
  posting,
  following,
  planing,
  guide,
  requetGuide,
  userInformation,
}: TagOpenStateProps) => {
  console.log(requetGuide)

  return (
    <Layouy>
      {/* 1. 기본정보 */}
      {basicInfo && (
        <BasicInfo
          name={userInformation.name}
          email={userInformation.email}
          nickname={userInformation.nickname}
          phonNum={userInformation.phonNum || '미등록'}
          password="********"
        />
      )}
      {/* 2. 리뷰 */}
      {review && <Review />}
      {/* 3. 포스팅 */}
      {posting && <Posting />}
      {/* 4. 팔로잉 */}
      {following && <Following />}
      {/* 5. 플랜 */}
      {planing && <Planing />}
      {/* 6. 가이드 FIXME: 만약 가이드로 로그인을 한 경우에만 활성화해서 보이게  */}
      {guide && <Guide />}
      {/* 7. 가이드 신청 */}
      {basicInfo == false &&
      review == false &&
      posting == false &&
      following == false &&
      planing == false &&
      guide == false ? (
        <RequestGuidePage />
      ) : null}
      {/* {requetGuide && <RequestGuidePage />} */}
    </Layouy>
  )
}

export default MainContainer

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Layouy = styled(FlexCenterd)`
  background-color: white;
  /* background-color: #4efab2; */
  z-index: 2;
  width: 90%;
  height: 100%;
  flex-direction: column;
  border: 0.2rem solid #afafaf79;
  box-shadow: 2px 2px 2px #afafaf79;
  border-radius: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
`

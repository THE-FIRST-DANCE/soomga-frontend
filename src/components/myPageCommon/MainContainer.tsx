import { styled } from 'styled-components'
import BasicInfo from './BasicInfo'
import Review from './Review'
import Posting from './Posting'
import Following from './Following'
import Planing from './Planing'

interface TagOpenStateProps {
  basicInfo: boolean
  review: boolean
  posting: boolean
  following: boolean
  planing: boolean
}

const MainContainer = ({ basicInfo = true, review, posting, following, planing }: TagOpenStateProps) => {
  return (
    <Layouy>
      {/* 1. 기본정보 */}
      {basicInfo && (
        <BasicInfo
          name={'이다슬'}
          mail={'suhyon0527@naver.com'}
          nickName={'젤이'}
          phonNum={'010-1234-1234'}
          password={'12312312'}
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

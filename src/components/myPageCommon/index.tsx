import { styled } from 'styled-components'

import LeftInfo from './LeftInfo'
import MainContainer from './MainContainer'
import { useState } from 'react'
const MyPage = () => {
  // 태그별 열림 상태
  const [basicInfo, setBasicInfo] = useState<boolean>(true)
  const [review, setReview] = useState<boolean>(false)
  const [posting, setPosting] = useState<boolean>(false)
  const [following, setFollowing] = useState<boolean>(false)
  const [planing, setPlaning] = useState<boolean>(false)
  const [guide, setGuide] = useState<boolean>(false)

  // 선택된 태그 순번관리
  const [selectedTag, setSelectedTag] = useState<number>(0)

  const changeTagHandler = (index: number, e: { target: any }) => {
    setSelectedTag(index)

    const target = e.target.textContent
    switch (target) {
      case '기본 정보':
        setBasicInfo(true)
        setReview(false)
        setPosting(false)
        setFollowing(false)
        setPlaning(false)
        setGuide(false)
        break
      case '리뷰':
        setBasicInfo(false)
        setReview(true)
        setPosting(false)
        setFollowing(false)
        setPlaning(false)
        setGuide(false)
        break
      case '포스트':
        setBasicInfo(false)
        setReview(false)
        setPosting(true)
        setFollowing(false)
        setPlaning(false)
        setGuide(false)
        break
      case '팔로잉':
        setBasicInfo(false)
        setReview(false)
        setPosting(false)
        setFollowing(true)
        setPlaning(false)
        setGuide(false)
        break
      case '플랜':
        setBasicInfo(false)
        setReview(false)
        setPosting(false)
        setFollowing(false)
        setPlaning(true)
        setGuide(false)
        break
      case '가이드':
        setBasicInfo(false)
        setReview(false)
        setPosting(false)
        setFollowing(false)
        setPlaning(false)
        setGuide(true)
        break
      default:
        break
    }
  }

  return (
    <>
      <Blank />
      <OverallLayout>
        <RedOuterFrame>
          {/* 🟡 왼쪽 : 사용자 Info */}
          <LeftInfo
            name={'이다슬'}
            mail={'suhyon0527@naver.com'}
            nickName={'젤이'}
            phonNum={'010-1234-1234'}
            password={'12312312'}
          />

          {/* 🟡 중앙 : 태그별 내용 */}
          <MainContainer
            basicInfo={basicInfo}
            review={review}
            posting={posting}
            following={following}
            planing={planing}
            guide={guide}
          />

          {/* 🟡 오른쪽 : 태그 */}
          <TagCategoryContainer>
            <TagCategory onClick={(e) => changeTagHandler(0, e)} selected={selectedTag === 0}>
              기본 정보
            </TagCategory>
            <TagCategory onClick={(e) => changeTagHandler(1, e)} selected={selectedTag === 1}>
              리뷰
            </TagCategory>
            <TagCategory onClick={(e) => changeTagHandler(2, e)} selected={selectedTag === 2}>
              포스트
            </TagCategory>
            <TagCategory onClick={(e) => changeTagHandler(3, e)} selected={selectedTag === 3}>
              팔로잉
            </TagCategory>
            <TagCategory onClick={(e) => changeTagHandler(4, e)} selected={selectedTag === 4}>
              플랜
            </TagCategory>

            {/* 🟡 가이드가 로그인 한 경우에만 활성화 */}
            {true && (
              <TagCategory onClick={(e) => changeTagHandler(5, e)} selected={selectedTag === 5}>
                가이드
              </TagCategory>
            )}
          </TagCategoryContainer>
        </RedOuterFrame>
      </OverallLayout>
    </>
  )
}

export default MyPage

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Blank = styled.div`
  width: 100%;
  height: 3rem;
  /* background-color: mediumaquamarine; */
`

const OverallLayout = styled(FlexCenterd)`
  width: 100%;
  min-height: 100vh;
`

/* 전체 빨간 프레임 */
const RedOuterFrame = styled(FlexCenterd)`
  border: 0.3rem solid var(--color-original);
  border-radius: 0.5rem;
  width: 83%;
  height: 38rem;
  gap: 0.3rem;
  padding: 1rem;
  box-sizing: border-box;
`

// 오른쪽
const TagCategoryContainer = styled(FlexCenterd)`
  /* background-color: #bd6af9; */
  width: 15%;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  padding-top: 2rem;
  margin-right: -2rem;
  box-sizing: border-box;
`
const TagCategory = styled(FlexCenterd)<{ selected: boolean }>`
  width: 80%;
  height: 3rem;
  /* background-color: #f395f5; */
  background-color: white;
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: pointer;
  margin-top: 0.1rem;
  border: 3px solid ${({ selected }) => (selected ? 'var(--color-original)' : '#afafaf79')};
  border-left: transparent;
  z-index: ${({ selected }) => (selected ? 3 : 'auto')}; // 선택된 태그에만 z-index를 설정합니다.
  transform: ${({ selected }) => (selected ? 'translateX(-0.5rem)' : 'translateX(-1.5rem)')};
  transition: all 0.3s;
  box-shadow: 2px 2px 2px #afafaf79;
`

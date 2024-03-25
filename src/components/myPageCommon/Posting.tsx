import SearchIcon from 'components/icons/Search'
import Star from 'components/icons/Star'
import { MouseEventHandler, useRef, useState } from 'react'
import { styled } from 'styled-components'
import PostCard from './PostCard'

const guideReviews = [
  {
    id: 1,
    user: 'alice_25@gmail.com',
    nickName: 'alice_25',
    country: 'France',
    star: 2,
    comment: "J'ai passé un moment merveilleux ici!",
  },
  {
    id: 2,
    user: 'bob_traveler@yahoo.com',
    nickName: 'bob_traveler',
    country: 'USA',
    star: 1,
    comment: 'The guide was incredibly knowledgeable and friendly. Highly recommend!',
  },
  {
    id: 3,
    user: 'carol_adventures@hotmail.com',
    nickName: 'carol_adventures',
    country: 'Australia',
    star: 4,
    comment: 'Had a great time exploring with this guide. Would love to come back again!',
  },
  {
    id: 4,
    user: 'david_wanderlust@gmail.com',
    nickName: 'david_wanderlust',
    country: 'Canada',
    star: 5,
    comment: 'Great experience overall. The guide made the trip memorable!',
  },
  {
    id: 5,
    user: 'emma_explorer@yahoo.co.uk',
    nickName: 'emma_explorer',
    country: 'United Kingdom',
    star: 3,
    comment: 'Enjoyed every bit of the tour. Would definitely recommend to others!',
  },
  {
    id: 6,
    user: 'frank_adventurer@gmail.com',
    nickName: 'frank_adventurer',
    country: 'New Zealand',
    star: 2,
    comment: 'An unforgettable experience with a knowledgeable guide. Thumbs up!',
  },
  {
    id: 7,
    user: 'grace_globetrotter@hotmail.com',
    nickName: 'grace_globetrotter',
    country: 'Germany',
    star: 4,
    comment: 'Had a wonderful time exploring with this guide. Recommended!',
  },
  {
    id: 8,
    user: 'harry_hiker@yahoo.com',
    nickName: 'harry_hiker',
    country: 'Switzerland',
    star: 5,
    comment: `The guide's expertise and enthusiasm made the tour exceptional!`,
  },
  {
    id: 9,
    user: 'isabel_adventurous@gmail.com',
    nickName: 'isabel_adventurous',
    country: 'Spain',
    star: 1,
    comment: 'Absolutely loved the tour. The guide was fantastic!',
  },
  {
    id: 10,
    user: 'jack_wild@yahoo.com',
    nickName: 'jack_wild',
    country: 'Italy',
    star: 3,
    comment: 'A great tour with a knowledgeable guide. Would recommend to friends!',
  },
]

const planReviews = [
  {
    id: 1,
    user: 'suhyon0527@naver.com',
    nickName: 'suhyon',
    country: 'japan',
    star: 4,
    comment: '風に戸惑う弱気な僕は通りすがるあの日の幻影本当は見た目以上涙もろい過去がある',
  },
  {
    id: 2,
    user: 'example1@example.com',
    nickName: 'example1',
    country: 'South Korea',
    star: 4,
    comment: '너무나도 감사해요!',
  },
  {
    id: 3,
    user: 'john_doe@gmail.com',
    nickName: 'john_doe',
    country: 'USA',
    star: 4,
    comment: 'This place is amazing!',
  },
  {
    id: 4,
    user: 'maria_123@yahoo.com',
    nickName: 'maria_123',
    country: 'Spain',
    star: 4,
    comment: '¡Una experiencia increíble!',
  },
  {
    id: 5,
    user: 'alexander99@hotmail.com',
    nickName: 'alexander99',
    country: 'Germany',
    star: 4,
    comment: 'Ich liebe diesen Ort!',
  },
  {
    id: 6,
    user: 'sakura_2000@gmail.com',
    nickName: 'sakura_2000',
    country: 'Japan',
    star: 4,
    comment: 'とても楽しい経験でした！',
  },
  {
    id: 7,
    user: 'michel_leblanc@yahoo.fr',
    nickName: 'michel_leblanc',
    country: 'France',
    star: 4,
    comment: "C'était incroyable!",
  },
  {
    id: 8,
    user: 'li_hua@163.com',
    nickName: 'li_hua',
    country: 'China',
    star: 4,
    comment: '太棒了!',
  },
  {
    id: 9,
    user: 'antonio_23@gmail.com',
    nickName: 'antonio_23',
    country: 'Italy',
    star: 4,
    comment: 'Che bella esperienza!',
  },
  {
    id: 10,
    user: 'natalia99@mail.ru',
    nickName: 'natalia99',
    country: 'Russia',
    star: 4,
    comment: 'Очень красиво!',
  },
]

import guideImg from 'assets/guideImg.png'

import seoul from 'assets/regions/seoul.jpeg'
import gyeonggi from 'assets/regions/gyeonggi.jpeg'
import jeonbuk from 'assets/regions/jeonbuk.jpeg'
import jeonnam from 'assets/regions/jeonnam.jpeg'
import chungbuk from 'assets/regions/chungbuk.jpeg'
import chungnam from 'assets/regions/chungnam.jpeg'
import gyeongbuk from 'assets/regions/gyeongbuk.jpeg'
import gyeongnam from 'assets/regions/gyeongnam.jpeg'
import jeju from 'assets/regions/jeju.jpeg'
import { postInfo } from 'pages/recommendationPage/detail'

export let regionsArr = [
  {
    id: 1,
    regionName: '서울',
    information: '대한민국의 수도 아리수, 대한민국의 수도 아리수',
    img: { seoul },
    like: 2,
    guideImg: guideImg,
  },
  {
    id: 2,
    regionName: '경기',
    information: '대한민국의 심장',
    img: gyeonggi,
    like: 4,
    guideImg: guideImg,
  },
  {
    id: 3,
    regionName: '전북',
    information: '전북 이랑께',
    img: jeonbuk,
    like: 5,
    guideImg: guideImg,
  },
  {
    id: 4,
    regionName: '전남',
    information: '전라도의 영광 전남',
    img: jeonnam,
    like: 2,
    guideImg: guideImg,
  },
  {
    id: 5,
    regionName: '충북',
    information: '살아있구먼 충북!',
    img: chungbuk,
    like: 4,
    guideImg: guideImg,
  },
  {
    id: 6,
    regionName: '충남',
    information: '울산의 자랑 울산의 얼굴 이재일입니다!',
    img: chungnam,
    like: 5,
    guideImg: guideImg,
  },
  {
    id: 7,
    regionName: '경북',
    information: '경북 좋아',
    img: gyeongbuk,
    like: 2,
    guideImg: guideImg,
  },
  {
    id: 8,
    regionName: '경남',
    information: '살아있네 살아있어 경남아이가!',
    img: gyeongnam,
    like: 4,
    guideImg: guideImg,
  },
  {
    id: 9,
    regionName: '제주',
    information: '제주의 자랑 제주의 얼굴 이재일입니다!',
    img: jeju,
    like: 5,
    guideImg: guideImg,
  },
]

// 리뷰 상태 타입
type WhatsReviewState = {
  guide: boolean
  user: boolean
}

// 리뷰 정렬 옵션
enum PostwSortOption {
  Latest = 'latest',
  HighestView = 'highestView',
}

const Posting = () => {
  // 태그별 열림 상태
  const [whatsReview, setWhatsReview] = useState<WhatsReviewState>({ guide: true, user: false })

  // 태그 선택시 스크롤 상단 올리기
  const reviewWrapperRef = useRef<HTMLDivElement>(null)
  const scrollToTop = () => {
    reviewWrapperRef.current.scrollTop = 0
  }

  // 정렬 옵션 상태 추가 : 디폴트는 최신순
  const [sortOption, setSortOption] = useState<PostwSortOption>(PostwSortOption.Latest)

  // 리뷰 정렬 기준 변경 핸들러
  const changeSortOptionHandler = (option: PostwSortOption) => {
    setSortOption(option)
    scrollToTop() // 정렬 기준 변경 시 최상단으로 스크롤
  }

  // 리뷰 정렬 함수
  const sortReviews = (reviews: any[]): any[] => {
    // 새로운 배열로 복제하여 정렬
    return [...reviews].sort((a, b) => {
      switch (sortOption) {
        case PostwSortOption.HighestView: // 평점 높은 순으로 정렬
          return b.star - a.star /// FIXME: 포스트에 맞춰서 수정
        case PostwSortOption.Latest:
        default:
          return b.id - a.id // 최신순으로 정렬
      }
    })
  }

  return (
    <>
      <Layout>
        {/* 검색  */}
        <SearchWrapper>
          <TopSearchWrap>
            <SearchIcon width="30px" height="30px" />
            <Input placeholder="리뷰 검색" />
          </TopSearchWrap>
          <SendBtn>검색</SendBtn>
        </SearchWrapper>

        {/* 순서 */}
        <OrderingWrapper>
          <Ordering onClick={() => changeSortOptionHandler(PostwSortOption.Latest)}>최신순</Ordering>
          <AfterBar />
          <Ordering onClick={() => changeSortOptionHandler(PostwSortOption.HighestView)}>조회순</Ordering>
        </OrderingWrapper>

        {/* 타이틀 */}
        <Title>✏️ 내가 작성한 포스트!</Title>

        {/* ✏️ 리뷰 */}
        <ReviewWrapper>
          <ReviewsWrapper ref={reviewWrapperRef}>
            {sortReviews(whatsReview.guide ? guideReviews : planReviews).map((review) => (
              // 반복시킬 내용
              <PostCard key={review.id} review={review} postInfo={postInfo} />
            ))}
          </ReviewsWrapper>
        </ReviewWrapper>
      </Layout>
    </>
  )
}

export default Posting

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Layout = styled(FlexCenterd)`
  width: 90%;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  /* background-color: #bc7de9; */
`

/* 🟣🟣🟣🟣🟣 검색 🟣🟣🟣🟣🟣*/
const SearchWrapper = styled(FlexCenterd)`
  /* background-color: mediumslateblue; */
  width: 100%;
  gap: 1rem;
  margin-bottom: 2rem;
`
const TopSearchWrap = styled(FlexCenterd)`
  padding: 0 0.5rem;
  background-color: #ececec;
  border-radius: 5px;
  height: 100%; /* 추가된 부분 */
`
const Input = styled.input`
  background-color: #ececec;
  height: 2rem;
  border: none;
  outline: none;
  margin: 0 0.5rem;
  box-sizing: border-box;
`
const SendBtn = styled.button`
  width: 3rem;
  height: 1.5rem;
  border: none;
  border-radius: 0.2rem;
  background-color: var(--color-original);
  color: white;
  cursor: pointer;
`

/* 🟣🟣🟣🟣🟣 순서 🟣🟣🟣🟣🟣 */
const OrderingWrapper = styled(FlexCenterd)`
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
`
const Ordering = styled(FlexCenterd)`
  /* background-color: mediumslateblue; */
  position: relative;
  cursor: pointer;

  &:active {
    color: var(--color-original);
    font-weight: bold;
  }
`

const Title = styled(FlexCenterd)`
  width: 100%;
  font-size: 1.3rem;
  margin-left: 15rem;
  margin-bottom: 1rem;
  justify-content: flex-start;
`

/* 🟣🟣🟣🟣🟣 AfterBar 🟣🟣🟣🟣🟣 */
const AfterBar = styled.div`
  width: 2px;
  height: 1rem;
  margin: 0 1rem;
  background-color: black;
`

/* 🟣🟣🟣🟣🟣 리뷰 박스 🟣🟣🟣🟣🟣 */
const ReviewWrapper = styled(FlexCenterd)`
  /* background-color: mediumslateblue; */
  width: 100%;
  gap: 1rem;
  /* margin-bottom: 2rem; */
`
// const ReviewsWrapper = styled(FlexCenterd)`
const ReviewsWrapper = styled.div`
  /* background-color: #fc7070; */
  width: 70%;
  height: 23rem;
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
`

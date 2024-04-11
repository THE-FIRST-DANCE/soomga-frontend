import SearchIcon from 'components/icons/Search'
import Star from 'components/icons/Star'
import { MouseEventHandler, useRef, useState } from 'react'
import { styled } from 'styled-components'

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

// 리뷰 상태 타입
type WhatsReviewState = {
  guide: boolean
  user: boolean
}

// 리뷰 정렬 옵션
enum ReviewSortOption {
  Latest = 'latest',
  HighestRating = 'highestRating',
  LowestRating = 'lowestRating',
}

const Review = () => {
  // 태그별 열림 상태
  const [whatsReview, setWhatsReview] = useState<WhatsReviewState>({ guide: true, user: false })

  // 태그 선택시 스크롤 상단 올리기
  const reviewWrapperRef = useRef<HTMLDivElement>(null)
  const scrollToTop = () => {
    if (reviewWrapperRef.current) {
      reviewWrapperRef.current.scrollTop = 0
    }
  }

  // 정렬 옵션 상태 추가 : 디폴트는 최신순
  const [sortOption, setSortOption] = useState<ReviewSortOption>(ReviewSortOption.Latest)

  // 리뷰 정렬 기준 변경 핸들러
  const changeSortOptionHandler = (option: ReviewSortOption) => {
    setSortOption(option)
    scrollToTop() // 정렬 기준 변경 시 최상단으로 스크롤
  }

  // 리뷰 정렬 함수
  const sortReviews = (reviews: any[]): any[] => {
    // 새로운 배열로 복제하여 정렬
    return [...reviews].sort((a, b) => {
      switch (sortOption) {
        case ReviewSortOption.HighestRating: // 평점 높은 순으로 정렬
          return b.star - a.star
        case ReviewSortOption.LowestRating: // 평점 낮은 순으로 정렬
          return a.star - b.star
        case ReviewSortOption.Latest:
        default:
          return b.id - a.id // 최신순으로 정렬
      }
    })
  }

  // 가이드 OR 유저 리뷰 선택
  const changeReviewHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    scrollToTop()
    const target = e.target as HTMLDivElement
    if (target.id === 'guide') {
      setWhatsReview({ guide: true, user: false })
    } else if (target.id === 'user') {
      setWhatsReview({ guide: false, user: true })
    }
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

        {/* 가이드 리뷰 OR 여행지 리뷰 */}
        <ReviewTopicsWrapper>
          <ReviewGuide id="guide" onClick={changeReviewHandler} $whatsReview={whatsReview.guide}>
            가이드
          </ReviewGuide>
          <ReviewUser id="user" onClick={changeReviewHandler} $whatsReview={whatsReview.user}>
            여행지
          </ReviewUser>
        </ReviewTopicsWrapper>

        {/* 순서 */}
        <OrderingWrapper>
          <Ordering onClick={() => changeSortOptionHandler(ReviewSortOption.Latest)}>최신순</Ordering>
          <AfterBar />
          <Ordering onClick={() => changeSortOptionHandler(ReviewSortOption.HighestRating)}>평점 높은 순</Ordering>
          <AfterBar />
          <Ordering onClick={() => changeSortOptionHandler(ReviewSortOption.LowestRating)}>평점 낮은 순</Ordering>
        </OrderingWrapper>

        {/* ✏️ 리뷰 */}
        <ReviewWrapper>
          <ReviewsWrapper ref={reviewWrapperRef}>
            {sortReviews(whatsReview.guide ? guideReviews : planReviews).map((review) => (
              <CommentLayout key={review.id}>
                {/* 이름 + 국정 + 별 + 일자 */}
                <CommentContainer>
                  <CommentUserWrapper>
                    <CommentUserName>{review.user}</CommentUserName>
                    <Country>{review.country}</Country>
                  </CommentUserWrapper>
                  <CommentUserWrapper>
                    <CommentUserName>
                      {Array.from({ length: review.star }, (_, index) => (
                        <Star key={index} $width="20px" $height="20px" $color="var(--color-primary)" />
                      ))}
                    </CommentUserName>
                    <Country>{new Date().toLocaleDateString()}</Country>
                  </CommentUserWrapper>
                </CommentContainer>
                <Comment>{review.comment}</Comment>
              </CommentLayout>
            ))}
          </ReviewsWrapper>
        </ReviewWrapper>
      </Layout>
    </>
  )
}

export default Review

const FlexCenterd = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Layout = styled(FlexCenterd)`
  width: 90%;
  /* height: 100vh; */
  margin-top: 3rem;
  padding: 1rem;
  box-sizing: border-box;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
  flex-direction: column;
  /* background-color: mediumaquamarine; */
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
  /* width: 16rem; */
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

/* 🟣🟣🟣🟣🟣 리뷰 항목 선택 🟣🟣🟣🟣🟣 */
const ReviewTopicsWrapper = styled(FlexCenterd)`
  width: 100%;
  /* height: 2rem; */
  /* background-color: mediumspringgreen; */
  margin-bottom: 2rem;
`
const ReviewGuide = styled(FlexCenterd)<{ $whatsReview: boolean }>`
  cursor: pointer;
  font-size: 1.3rem;
  margin: 0 1rem;
  color: ${({ $whatsReview }) => ($whatsReview ? 'var(--color-original);' : 'black')};
  transition: all 0.3s;
`
const ReviewUser = styled(FlexCenterd)<{ $whatsReview: boolean }>`
  cursor: pointer;
  font-size: 1.3rem;
  margin: 0 1rem;
  color: ${({ $whatsReview }) => ($whatsReview ? 'var(--color-original);' : 'black')};
  transition: all 0.3s;
`

/* 🟣🟣🟣🟣🟣 순서 🟣🟣🟣🟣🟣 */
const OrderingWrapper = styled(FlexCenterd)`
  width: 100%;
  /* height: 100%; */
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

/* AfterBar */
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
  margin-bottom: 2rem;
`
const ReviewsWrapper = styled.div`
  /* background-color: #fc7070; */
  width: 80%;
  height: 22rem;
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
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

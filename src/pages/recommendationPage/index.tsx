import { styled } from 'styled-components'

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

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import { useNavigate } from 'react-router-dom'
import RecommedCard from 'components/recommendations/RecommedCard'
import { useEffect } from 'react'

export let regionsArr = [
  {
    id: 1,
    regionName: '서울',
    information: '대한민국의 수도 아리수, 대한민국의 수도 아리수',
    img: seoul,
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

const RecommendatedPostPage = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      {/* 🟡 추천 포스트 🟡 */}
      <Title>추천 포스트</Title>
      <CarouselLayout>
        {/* 1. Swiper 레이어아웃 */}
        <SwiperLayout>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow]}
            grabCursor={true}
            spaceBetween={50}
            slidesPerView={2}
            slidesPerGroup={2} // 한 번에 보여지는 슬라이드 수
            loop={true}
            speed={400}
            mousewheel={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            // navigation={true} // 좌우 버튼
            // pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
            centeredSlides={false} // 현재 슬라이드를 가운데 정렬
          >
            {regionsArr.map((regionInfo) => (
              <SwiperSlide key={regionInfo.regionName}>
                {() => (
                  <>
                    {/*  캐러셀 시작점  */}
                    <RecommedCard
                      regionInfo={regionInfo}
                      navigate={navigate}
                      guideImg={regionInfo.guideImg}
                      regionImg={regionInfo.img}
                    />
                  </>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperLayout>
      </CarouselLayout>

      {/* 🟡 지역 🟡 */}
      <RegionsTitle>지역</RegionsTitle>
      <RegionsContainer>
        {regionsArr.map((regionInfo) => (
          <Region
            key={regionInfo.id}
            region={regionInfo.img}
            onClick={() => navigate(`/recommendations/${regionInfo.regionName}`)}
          >
            <img src={regionInfo.img} />
            <Letter>{regionInfo.regionName}</Letter>
          </Region>
        ))}
      </RegionsContainer>
    </Layout>
  )
}

export default RecommendatedPostPage

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Layout = styled.div`
  /* background-color: mediumaquamarine; */
  margin: 0 auto;
  width: 90%;
  min-height: 1000px;
  margin-top: 11rem;
`

const Title = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
  margin-left: 13rem;
`

/* 캐러셀 */
const CarouselLayout = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 200px;
  /* background-color: #b725f6; */
`

// 1. Swiper 레이어아웃
const SwiperLayout = styled.div`
  /* width: 80%; */
  width: 93%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #faabd8; */
`

const RegionsTitle = styled(Title)`
  font-size: 3.8rem;
  text-align: center;
  margin-left: 0rem;
`
const RegionsContainer = styled(FlexCenter)`
  flex-wrap: wrap;
  /* background-color: #b725f6; */
  min-height: 20rem;
  /* padding: 0.5rem; */
  /* box-sizing: border-box; */
  gap: 2rem;
  margin-bottom: 5rem;
`
const Region = styled(FlexCenter)<{ region: string }>`
  font-size: 2rem;
  width: 30%;
  height: 20rem;
  color: white;
  cursor: pointer;
  border-radius: 15px;
  background-size: cover;
  background-position: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
    transition: all 0.5s;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover {
    img {
      transition: all 0.5s;
      transform: scale(1.1);
    }
    &::before {
      opacity: 1; /* hover 시 투명도를 1로 변경하여 나타나도록 설정 */
    }
  }
`

const Letter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: white;
  font-weight: bold;
  text-align: center;
  z-index: 3;
`

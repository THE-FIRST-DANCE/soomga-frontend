import { styled } from 'styled-components'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import { useNavigate } from 'react-router-dom'
import { provinces } from 'data/region'
import { useQuery } from '@tanstack/react-query'
import { getRecommendation } from 'api/TouristAPI'
import { Tourist } from 'interfaces/tourist'
import TouristCard from 'components/recommendations/TouristCard'

const RecommendatedPostPage = () => {
  const [recommendation, setRecommendation] = useState<Tourist[]>([])

  const navigate = useNavigate()

  const onClickRegion = (region: number) => {
    navigate(`/recommendations/${region}`)
  }

  const { data } = useQuery({
    queryKey: ['recommendation'],
    queryFn: getRecommendation,
  })

  useEffect(() => {
    if (data) {
      setRecommendation(data)
    }
  }, [data])

  return (
    <Layout>
      {/* 🟡 추천 포스트 🟡 */}
      <Title>추천 포스트</Title>
      <CarouselLayout>
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
            centeredSlides={false} // 현재 슬라이드를 가운데 정렬
            style={{
              padding: '0 1rem',
            }}
          >
            {recommendation?.map((post: Tourist) => (
              <SwiperSlide key={post.id}>
                <TouristCard data={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperLayout>
      </CarouselLayout>

      {/* 🟡 지역 🟡 */}
      <RegionsTitle>지역</RegionsTitle>
      <RegionsContainer>
        {provinces.map((regionInfo) => (
          <RegionCard
            onClick={() => {
              onClickRegion(regionInfo.id)
            }}
            key={regionInfo.id}
          >
            <img src={regionInfo.img} alt={regionInfo.name} loading="lazy" />
            <Letter>{regionInfo.name}</Letter>
          </RegionCard>
        ))}
      </RegionsContainer>
    </Layout>
  )
}

export default RecommendatedPostPage

const Layout = styled.div`
  margin: 0 auto;
  margin-top: 10rem;
  width: 1240px;
`

const Title = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`

/* 캐러셀 */
const CarouselLayout = styled.div`
  display: flex;
  justify-content: center;
  z-index: 1;
`

// 1. Swiper 레이어아웃
const SwiperLayout = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

/* 🟡 지역  🟡*/
const RegionsTitle = styled(Title)`
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  /* margin-left: 0rem; */
`
const RegionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 1rem 0;

  @media screen and (max-width: 1240px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const RegionCard = styled.div`
  width: 100%;
  height: 15rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

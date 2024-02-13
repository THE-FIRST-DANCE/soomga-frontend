import styled from 'styled-components'

// Import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import busan from 'assets/busan.png'
import geoje from 'assets/geoje.png'
import ulsan from 'assets/ulsan.png'
import seoul from 'assets/seoul.png'
import Star from 'components/icons/Star'

// 케러셀 인터페이스
interface ActivStatus {
  activStatus: string
}

const RegionCarousel = () => {
  /* 📝 임의 데이터 */
  let regionsArr = [
    {
      id: 1,
      regionName: '서울',
      information: '대한민국의 수도 아리수, 대한민국의 수도 아리수',
      img: seoul,
      like: 2,
    },
    {
      id: 2,
      regionName: '부산',
      information: '살아있네 살아있어 부산아이가!',
      img: busan,
      like: 4,
    },
    {
      id: 3,
      regionName: '울산',
      information: '울산의 자랑 울산의 얼굴 이재일입니다!',
      img: ulsan,
      like: 5,
    },
    {
      id: 4,
      regionName: '거제도',
      information: '거제도에는 정말 많은 해산물들이 즐비합니다!',
      img: geoje,
      like: 3,
    },
  ]

  return (
    <CarouselLayout>
      {/* 1. Swiper 레이어아웃 */}
      <SwiperLayout>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 15, // 회전 각도
            stretch: 0,
            depth: 100, // 카드 간의 간격
            modifier: 2.5, // "modifier"는 coverflow 효과에 적용되는 슬라이드의 z-index를 조절합니다.
            slideShadows: false,
          }}
          grabCursor={true}
          spaceBetween={50}
          slidesPerView={2}
          loop={true}
          speed={400}
          mousewheel={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          // navigation={true} // 좌우 버튼
          // pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          centeredSlides={true} // 현재 슬라이드를 가운데 정렬
          slidesPerGroup={1} // 한 번에 보여지는 슬라이드 수
        >
          {regionsArr.map((regionInfo) => (
            <SwiperSlide key={regionInfo.regionName}>
              {({ isActive }) => (
                <>
                  {/* 2. Swiper 이미지 컨테이너 */}
                  <SlideContainer activStatus={isActive ? 'active' : 'transparent'}>
                    {/* 2.1 Swiper 이미지 랩퍼 */}
                    <ImageWrapper className="image">
                      <img src={regionInfo.img} alt="" />
                    </ImageWrapper>
                  </SlideContainer>

                  {/* 3. Swiper 지역 + 정보 */}
                  <Letters activStatus={isActive ? 'active' : ''}>
                    <div>{isActive ? regionInfo.regionName : ''}</div>
                    <span>{isActive ? regionInfo.information : ''}</span>
                    <div>
                      {isActive
                        ? Array.from({ length: regionInfo.like }, (_, index) => (
                            <Star key={index} width="50px" height="50px" fill="var(--color-primary)" />
                          ))
                        : ''}
                    </div>
                  </Letters>
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperLayout>
    </CarouselLayout>
  )
}

export default RegionCarousel

const CarouselLayout = styled.div`
  display: flex;
  justify-content: center;
  margin: 300px 0;
  /* background-color: #b725f6; */
`

// 1. Swiper 레이어아웃
const SwiperLayout = styled.div`
  width: 80%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #faabd8; */
`

// 2. Swiper 이미지 컨테이너
const SlideContainer = styled.div<ActivStatus>`
  width: 100%;
  height: 450px;
  /* background-color: ${({ activStatus }) => (activStatus === 'active' ? '#00000010' : 'transparent')}; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;

  & > .image img {
    /* transform: ${({ activStatus }) => (activStatus === 'active' ? `translateY(-20px)` : 'translateY(0)')}; */
    transition: all 0.7s;
  }
`

// 2.1 Swiper 이미지 랩퍼
const ImageWrapper = styled.div`
  width: 80%;
  height: 450px;
  /* height: auto; */
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`

// 3. Swiper 지역 + 정보
const Letters = styled.div<ActivStatus>`
  transform: ${({ activStatus }) => (activStatus === 'active' ? `translateY(25px)` : 'translateY(0)')};
  transition: all 0.7s;
  > div {
    font-size: 50px;
    text-align: center;
    margin-bottom: 20px;
  }

  > span {
    font-size: 30px;
    display: block;
    text-align: center;
  }
`

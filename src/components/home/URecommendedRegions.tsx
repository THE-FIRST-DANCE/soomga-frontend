import styled from 'styled-components'
import main_leftImg from '../../assets/main_leftImg.png'
import main_leftLetter from '../../assets/main_leftLetter.svg'
import logo from '../../assets/logo_noLetter.svg'

import seoul from '../../assets/seoul.png'
import busan from '../../assets/busan.png'
import ulsan from '../../assets/ulsan.png'
import geoje from '../../assets/geoje.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const URecommendedRegions = () => {
  let navigate = useNavigate()

  const [tets, setTets] = useState<number>()

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      console.log(`현재 윈도우 창의 너비: ${newWidth}px`)
      setTets(newWidth)
    }

    // 초기 렌더링 시에만 실행
    handleResize()

    // 창의 크기가 변경될 때마다 실행
    window.addEventListener('resize', handleResize)

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  /* 📝 임의 데이터 */
  let regionsArr = [
    {
      id: 1,
      regionName: '서울',
      regionInfo: '넓은 공간이 필요하다면 집 전체를 단독으로 사용하는 숙소를 찾아보세요.',
      img: seoul,
    },
    {
      id: 2,
      regionName: '부산',
      regionInfo: '넓은 공간이 필요하다면 집 전체를 단독으로 사용하는 숙소를 찾아보세요.',
      img: busan,
    },
    {
      id: 3,
      regionName: '울산',
      regionInfo: '넓은 공간이 필요하다면 집 전체를 단독으로 사용하는 숙소를 찾아보세요.',
      img: ulsan,
    },
    {
      id: 4,
      regionName: '거제도',
      regionInfo: '넓은 공간이 필요하다면 집 전체를 단독으로 사용하는 숙소를 찾아보세요.',
      img: geoje,
    },
  ]

  return (
    <URecommendedRegionsLayout>
      {/* Inner : 정렬 */}
      {/* 🟡 1. 좌측 : 갑자기 도움이 필요할 때 (sos페이지) */}
      <LeftSection>
        {/* 1.1 로고 + 타이틀 */}
        <TitleContainer>
          {/* 1.1.1 로고 */}
          <LogoWrapper>
            <img src={logo} alt="logo" />
          </LogoWrapper>
          {/* 1.1.2 타이틀 */}
          <span>갑자기 도움이 필요할 때!</span>
        </TitleContainer>
        {/* 1.2 이미지 링크 */}
        <LeftImgContainer onClick={() => navigate(`/sos`)}>
          <img className="mainLeftImage" src={main_leftImg} alt="nosyasin" />
          {/* 1.2.1 글자 이미지 */}
          <LeftLetterWrapper>
            <img src={main_leftLetter} alt="" />
          </LeftLetterWrapper>
        </LeftImgContainer>
      </LeftSection>

      {/* 🟡 2. 우측 : 내 취향에 맞는 여행지를 찾아봐 (유저 순위 추천) */}
      <RigthSection>
        {/* 2.1 로고 + 타이틀 */}
        <TitleContainer>
          {/* 2.1.1 로고 */}
          <LogoWrapper>
            <img src={logo} alt="logo" />
          </LogoWrapper>
          {/* 2.1.2 타이틀 */}
          <span>내 취향에 맞는 여행지를 찾아봐!</span>
        </TitleContainer>

        {/* 2.2 추천 지역들 */}
        <RightRegionsContainer>
          {regionsArr.map((regionInformation) => (
            // 2.2.1 추천지역 Wrapper : Img + Title + Info
            <RegionsWrapper onClick={() => navigate(`/recommendations/region/${regionInformation.id}`)}>
              {/* 2.2.1.1 추천지역 Img */}
              <RegionImg key={regionInformation.regionName}>
                <img src={regionInformation.img} alt={regionInformation.regionName} />
              </RegionImg>
              {/* 2.2.1.2 추천지역 Title */}
              <RegionTitle>{regionInformation.regionName}</RegionTitle>
              {/* 2.2.1.3 추천지역 Info */}
              <RegionInfo>{regionInformation.regionInfo}</RegionInfo>
            </RegionsWrapper>
          ))}
        </RightRegionsContainer>
      </RigthSection>
    </URecommendedRegionsLayout>
  )
}

export default URecommendedRegions

/* ----------------------------- 💅 StyledComponent -----------------------------*/

const URecommendedRegionsLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`

/* Inner : 정렬  */
const Inner = styled.div`
  /* background-color: red; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`

/* 🟡 1. 좌측 : 갑자기 도움이 필요할 때 (sos페이지) */
const LeftSection = styled.div`
  flex: 0.2 1 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// 1.1 로고 + 타이틀
const TitleContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1.5rem;
    font-weight: bold;

    font-family: 'Black Han Sans', sans-serif;
  }
`

// 1.1.1 로고 이미지
const LogoWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`

// 1.2 이미지 링크
const LeftImgContainer = styled.div`
  width: 22rem;
  height: 33rem;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow:
    5px 19px 38px rgba(0, 0, 0, 0.3),
    5px 15px 12px rgba(0, 0, 0, 0.22);

  &:hover .mainLeftImage {
    transform: scale(1.2);
  }

  img {
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
  }

  div {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -100px;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 700;
    background-image: linear-gradient(to top, #ffffffec, #ffffff28);
  }
`

// 1.2.1 글자 이미지
const LeftLetterWrapper = styled.div`
  img {
    width: 70%;
    height: 70%;
  }
`

/* 🟡 2. 우측 : 내 취향에 맞는 여행지를 찾아봐 (유저 순위 추천)  */
const RigthSection = styled.div`
  /* background-color: royalblue; */
  flex: 0.3 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

//* 2.1 로고 + 타이틀 */
const RightTitleContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
`

/* 2.1.1 로고 */
const RightLogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`

/* 2.2 추천 지역들  */
const RightRegionsContainer = styled.div`
  /* background-color: palegreen; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6rem;
`

// 2.2.1 추천지역 Wrapper : Img + Title + Info
const RegionsWrapper = styled.div`
  /* background-color: red; */
  width: 16rem;
  height: 11rem;
  margin: 0.5rem 0;
  cursor: pointer;

  &:hover img {
    transform: scale(1.2);
  }
`
// 2.2.1.1 추천지역 Img
const RegionImg = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  margin-bottom: 0.3rem;
  box-shadow:
    5px 7px 38px rgba(0, 0, 0, 0.3),
    5px 10px 12px rgba(0, 0, 0, 0.22);

  // 2.2.1.1 추천지역 Img
  img {
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
  }
`
// 2.2.1.2 추천지역 Title
const RegionTitle = styled.div`
  font-size: 1.5rem;
`
// 2.2.1.3 추천지역 Info
const RegionInfo = styled.div`
  font-size: 0.8rem;
`

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
      <Inner>
        {/* 🟡 1. 좌측 : 갑자기 도움이 필요할 때 (sos페이지) */}
        <LeftSection>
          {/* 1.1 로고 + 타이틀 */}
          <LeftTitleContainer>
            {/* 1.1.1 로고 */}
            <LeftLogoWrapper>
              <img src={logo} alt="logo" />
            </LeftLogoWrapper>
            {/* 1.1.2 타이틀 */}
            <span>갑자기 도움이 필요할 때!</span>
          </LeftTitleContainer>
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
          <RightTitleContainer>
            {/* 2.1.1 로고 */}
            <RightLogoWrapper>
              <img src={logo} alt="logo" />
            </RightLogoWrapper>
            {/* 2.1.2 타이틀 */}
            <span>내 취향에 맞는 여행지를 찾아봐!{tets}</span>
          </RightTitleContainer>

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
      </Inner>
    </URecommendedRegionsLayout>
  )
}

export default URecommendedRegions

/* ----------------------------- 💅 StyledComponent -----------------------------*/

const URecommendedRegionsLayout = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`

/* Inner : 정렬  */
const Inner = styled.div`
  /* background-color: red; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

/* 🟡 1. 좌측 : 갑자기 도움이 필요할 때 (sos페이지) */
const LeftSection = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  margin-left: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 30px;
    font-family: 'Black Han Sans', sans-serif;
  }
`

// 1.1 로고 + 타이틀
const LeftTitleContainer = styled.div`
  width: 100%;
  /* height: 100px; */
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

// 1.1.1 로고
const LeftLogoWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
  }
`

// 1.2 이미지 링크
const LeftImgContainer = styled.div`
  width: 500px;
  height: 1200px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow:
    5px 19px 38px rgba(0, 0, 0, 0.3),
    5px 15px 12px rgba(0, 0, 0, 0.22);

  //! 화면 넓이가 1360px 이상일 때 적용되는 스타일
  @media (min-width: 1360px) {
    width: 800px;
  }

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
  width: 60%;
  height: 100%;
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
  font-size: 30px;
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
  width: 100%;
  height: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

// 2.2.1 추천지역 Wrapper : Img + Title + Info
const RegionsWrapper = styled.div`
  width: 500px;
  height: 400px;
  margin: 0 30px;
  cursor: pointer;

  //! 화면 넓이가 1360px 이상일 때 적용되는 스타일
  @media (min-width: 2270px) {
    width: 500px;
    height: 550px;
    margin: 0 80px;
  }

  &:hover img {
    transform: scale(1.2);
  }
`
// 2.2.1.1 추천지역 Img
const RegionImg = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  margin-bottom: 20px;
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
  font-size: 35px;
`
// 2.2.1.3 추천지역 Info
const RegionInfo = styled.div`
  font-size: 18px;
`
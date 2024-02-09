import styled from 'styled-components'
import logo from '../../assets/logo_noLetter.svg'
import seoul from '../../assets/seoul.png'
import busan from '../../assets/busan.png'
import ulsan from '../../assets/ulsan.png'
import geoje from '../../assets/geoje.png'
import { useNavigate } from 'react-router-dom'

const RecommendedRegions = () => {
  let navigate = useNavigate()

  /* 📝 임의 데이터 */
  let regionsArr = [
    {
      id: 1,
      regionName: '서울',
      img: seoul,
    },
    {
      id: 2,
      regionName: '부산',
      img: busan,
    },
    {
      id: 3,
      regionName: '울산',
      img: ulsan,
    },
    {
      id: 4,
      regionName: '거제도',
      img: geoje,
    },
  ]

  return (
    // 1. Soomga의 추천지역 Layout
    <RecommendedRegionsLayout>
      {/* 2. Soomga의 추천 지역 : Logo + letter */}
      <LogoAndLetterContainer>
        {/* 2.1 Logo : 그림 이미지 */}
        <ImgWrapper>
          <img src={logo} alt="logo" />
        </ImgWrapper>
        {/* 2.2 letter : Soomga의 추천 지역 */}
        <span>Soomga의 추천 지역</span>
      </LogoAndLetterContainer>
      {/* 3. 추천지역 List Container */}
      <RegionsContainer>
        {regionsArr.map((regionInfo) => (
          /* 3.1 추천 지역 카드 */
          <Region key={regionInfo.regionName} onClick={() => navigate(`/recommendations/region/${regionInfo.id}`)}>
            {/* 3.1.1 추천 지역 이미지 */}
            <img src={regionInfo.img} alt={regionInfo.regionName} />
            {/* 3.1.2 추천 지역 글자 : 지역 이름 */}
            <div>{regionInfo.regionName}</div>
          </Region>
        ))}
      </RegionsContainer>
    </RecommendedRegionsLayout>
  )
}
export default RecommendedRegions

/* ----------------------------- 💅 StyledComponent -----------------------------*/

/*  1. Soomga의 추천지역 Layout */
const RecommendedRegionsLayout = styled.div`
  width: 100%;
  height: auto;
  /* background-color: orange; */
`
/* 2. Soomga의 추천 지역 : Logo + letter */
const LogoAndLetterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;

  /*  2.2 letter : Soomga의 추천 지역 */
  span {
    font-size: 80px;
    font-family: 'Black Han Sans', sans-serif;
  }
`
/* 2.1 Logo : 그림 이미지  */
const ImgWrapper = styled.div`
  width: 120px;
  height: 120px;

  img {
    width: 100%;
    height: 100%;
  }
`

/* 3. 추천지역 List Container */
const RegionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`

/* 3.1 추천 지역 카드 */
const Region = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  position: relative;
  margin: 30px;
  border-radius: 20px;
  cursor: pointer;

  &:hover img {
    transform: scale(1.2);
  }

  /* 3.1.1 추천 지역 이미지 */
  img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
  }

  /* 추천 지역 글자 : 지역 이름 */
  div {
    position: absolute;
    width: 100%;
    height: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 700;
    background-color: #ffffff92;
    /* background-color: #ffffff54; */
  }
`

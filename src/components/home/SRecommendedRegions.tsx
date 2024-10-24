import styled from 'styled-components'
import logo from '../../assets/logo_noLetter.svg'
import seoul from '../../assets/region_seoul.png'
import busan from '../../assets/region_busan.png'
import daegu from '../../assets/region_daegu.png'
import jeju from '../../assets/region_jeju.png'
import { useNavigate } from 'react-router-dom'

const RecommendedRegions = () => {
  let navigate = useNavigate()

  /* 📝 임의 데이터 */
  // FIXME: (전시회) 추천 지역 데이터
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
      regionName: '대구',
      img: daegu,
    },
    {
      id: 17,
      regionName: '제주도',
      img: jeju,
    },
  ]

  return (
    // 1. Soomga의 추천지역 Layout
    <SRecommendedRegionsLayout>
      <div style={{ margin: '0 auto', maxWidth: '1200px' }}>
        {/* 2. Soomga의 추천 지역 : Logo + letter */}
        <LogoAndLetterContainer>
          <Title>숨은 가이드's Pick 💁‍♂️</Title>
          숨은 가이드가 엄선한 특별한 여행지를 만나보세요. 각 지역의 숨겨진 매력을 발견하고 잊지 못할 추억을
          만들어보세요.
        </LogoAndLetterContainer>
        {/* 3. 추천지역 List Container */}
        <RegionsContainer>
          {regionsArr.map((regionInfo) => (
            /* 3.1 추천 지역 카드 */
            <Region key={regionInfo.regionName} onClick={() => navigate(`/recommendations/${regionInfo.id}`)}>
              {/* 3.1.1 추천 지역 이미지 */}
              <img src={regionInfo.img} alt={regionInfo.regionName} />
              {/* 3.1.2 추천 지역 글자 : 지역 이름 */}
              <div>{regionInfo.regionName}</div>
            </Region>
          ))}
        </RegionsContainer>
      </div>
    </SRecommendedRegionsLayout>
  )
}
export default RecommendedRegions

/* ----------------------------- 💅 StyledComponent -----------------------------*/

/*  1. Soomga의 추천지역 Layout */
const SRecommendedRegionsLayout = styled.div`
  width: 100%;
  height: auto;
  padding-top: 3rem;
  padding-bottom: 8rem;

  opacity: 1;
  background-color: rgb(250 250 250);
`
/* 2. Soomga의 추천 지역 : Logo + letter */
const LogoAndLetterContainer = styled.div`
  /* background-color: orange; */
  width: 100%;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
`
/* 2.1 Logo : 그림 이미지  */
const ImgWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
  }
`

/* 3. 추천지역 List Container */
const RegionsContainer = styled.div`
  /* background-color: orange; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  /* margin: 0.5rem 0; */
`

/* 3.1 추천 지역 카드 */
const Region = styled.div`
  width: 12rem;
  height: 12rem;
  /* width: 10rem;
  height: 10rem; */
  overflow: hidden;
  position: relative;
  /* margin: 30px; */
  border-radius: 20px;
  cursor: pointer;
  box-shadow:
    5px 19px 38px rgba(0, 0, 0, 0.3),
    5px 15px 12px rgba(0, 0, 0, 0.22);

  &:hover img {
    transform: scale(1.2);
  }

  /* 3.1.1 추천 지역 이미지 */
  img {
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
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
    font-size: 1rem;
    font-weight: 700;
    color: white;
    background-image: linear-gradient(to top, #000000ae, #00000045);
  }
`

const Title = styled.h2`
  font-size: 2rem;
  font-family: 'Black Han Sans', sans-serif;
  font-weight: bold;
`

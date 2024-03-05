import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { regionsArr } from './index'
import RecommedCard from 'components/recommendations/RecommedCard'

const RegionsList = () => {
  let { region_Id } = useParams()
  console.log(' region_Id: ', region_Id)
  console.log(regionsArr)
  const navigate = useNavigate()

  return (
    <Layout>
      <Title>{region_Id}</Title>

      {/* 가이드 추천순 */}
      <GuideContainer>
        <SubTitle>가이드 추천순</SubTitle>
        <Wrapper>
          {regionsArr.map(
            (regionInfo: { id: number; regionName: string; guideImg: string; img: string }, index) =>
              index + 1 <= 4 && (
                <RecommedCard
                  regionInfo={regionInfo}
                  navigate={navigate}
                  guideImg={regionInfo.guideImg}
                  regionImg={regionInfo.img}
                />
              ),
          )}
        </Wrapper>
      </GuideContainer>

      {/* 여행자 추천순 */}
      <TravelerContainer>
        <SubTitle>여행자 추천순</SubTitle>
        <Wrapper>
          {regionsArr.map(
            (regionInfo: { id: number; regionName: string; guideImg: string; img: string }, index) =>
              index + 1 <= 4 && (
                <RecommedCard
                  regionInfo={regionInfo}
                  navigate={navigate}
                  guideImg={regionInfo.guideImg}
                  regionImg={regionInfo.img}
                />
              ),
          )}
        </Wrapper>
      </TravelerContainer>
    </Layout>
  )
}

export default RegionsList

// 중앙 정렬
const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Layout = styled.div`
  /* background-color: mediumaquamarine; */
  margin: 0 auto;
  width: 90%;
  margin-top: 11rem;
  margin-bottom: 5rem;
  padding: 0 2rem;
  box-sizing: border-box;
`

const Title = styled.div`
  font-size: 5rem;
  text-align: center;
  margin-bottom: 5rem;
`
const GuideContainer = styled.div`
  /* background-color: #8741f1; */
  width: 100%;
  min-height: 60rem;
  margin-bottom: 5rem;
`

const SubTitle = styled.div`
  font-size: 3rem;
  margin-bottom: 2rem;
  margin-left: 3.5rem;
`
const Wrapper = styled(FlexCenter)`
  /* background-color: #f1bc41; */
  width: 100%;
  min-height: 700px;
  gap: 3rem;
  flex-wrap: wrap;
`

/* Travelers */
const TravelerContainer = styled.div`
  /* background-color: royalblue; */
  min-height: 700px;
`

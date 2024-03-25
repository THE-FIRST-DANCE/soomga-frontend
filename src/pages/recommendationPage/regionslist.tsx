import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { regionsArr } from './index'
import RecommedCard from 'components/recommendations/RecommedCard'

import PageNation from 'components/recommendations/PageNation'

interface ThProps {
  width: string
}

type Post = {
  id: number
  title: string
  author: string
  date: string
  views: number
  likes: number
}

export const posts = [
  { id: 1, region: '서울', title: '첫 번째 게시글', author: '桑田', date: '2021-09-01', views: 100, likes: 10 },
  { id: 2, region: '부산', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 3, region: '울산', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 4, region: '대구', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 5, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 6, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 7, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 8, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 9, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 10, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 11, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 12, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 13, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 14, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  { id: 15, region: '서울', title: '두 번째 게시글', author: '長谷川', date: '2021-09-02', views: 150, likes: 20 },
  // 추가적인 게시글 데이터...
]

const RegionsList = () => {
  let { region_Id } = useParams()
  console.log(' region_Id: ', region_Id)
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
      {/* 게시판 */}

      {/* 페이지 네이션 */}
      <PageNation></PageNation>
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
  width: 80%;
  /* width: 55%; */
  margin-top: 11rem;
  margin-bottom: 5rem;
  padding: 0 2rem;
  box-sizing: border-box;
`

const Title = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 5rem;
`
const GuideContainer = styled.div`
  /* background-color: #8741f1; */
  width: 100%;
  /* min-height: 60rem; */
  margin-bottom: 5rem;
`

const SubTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  margin-left: 3.5rem;
`
const Wrapper = styled(FlexCenter)`
  /* background-color: #f1bc41; */
  width: 100%;
  /* min-height: 700px; */
  gap: 3rem;
  flex-wrap: wrap;
`

/* Travelers */
const TravelerContainer = styled.div`
  /* background-color: royalblue; */
  margin-bottom: 5rem;
  /* min-height: 700px; */
`

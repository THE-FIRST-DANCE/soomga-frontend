import React from 'react'
import { styled } from 'styled-components'
import userImage from 'assets/userImage.svg'
import logo from 'assets/logo.svg'
const GuideCard = () => {
  //  테스트 데이터

  const userTestDatas = [
    {
      temperature: 35,
      image: '',
      sex: 'male',
      userName: '사용자2',
      location: '서울',
      age: 32,
      languages: ' 영어, 한국어',
      guideCount: 315,
      rating: 4.7,
      tags: ['서울 탐험', '한식 미식', '태그3', '태그4', '태그5'],
    },

    {
      temperature: 28,
      image: logo,
      sex: 'female',
      userName: '사용자3',
      location: '부산',
      age: 28,
      languages: '영어, 일본어',
      guideCount: 200,
      rating: 4.6,
      tags: ['해운대', '부산', '태그3', '태그4', '태그5'],
    },
    {
      temperature: 36,
      image: logo,
      sex: 'female',
      userName: '사용자4',
      location: '대구',
      age: 35,
      languages: '일본어, 한국어',
      guideCount: 400,
      rating: 4.8,
      tags: ['팔공산', '대구', '태그3', '태그4', '태그5'],
    },
    {
      temperature: 30,
      image: logo,
      sex: 'male',
      userName: '사용자5',
      location: '인천',
      age: 25,
      languages: '영어, 한국, 스페인어',
      guideCount: 150,
      rating: 4.3,
      tags: ['인천공항', '인천', '태그3', '태그4', '태그5'],
    },
    {
      temperature: 31,
      image: logo,
      sex: 'male',
      userName: '사용자6',
      location: '대전',
      age: 40,
      languages: '영어, 한국어',
      guideCount: 500,
      rating: 4.9,
      tags: ['대전역', '대전', '태그3', '태그4', '태그5'],
    },
  ]

  return (
    <>
      <RightSectionTitle>{`SoomGa의 가이드님, ${userTestDatas.length} 명`}</RightSectionTitle>
      {userTestDatas.map((data) => {
        return (
          <CardLayout>
            <CardContainer>
              {/* FIXME: 온도 */}
              <Temperature>{`${data.temperature}°C`}</Temperature>
              {/* 🟡 왼쪽 */}
              <LeftLayout>
                <UserImageLayout>
                  <ImageWrapper>
                    <GenderMarker sex={data.sex} />
                    {/* FIXME: 이미지 */}
                    {data.image ? <img src={data.image} alt="userImage" /> : <img src={userImage} alt="userImage" />}
                  </ImageWrapper>
                </UserImageLayout>
                {/* FIXME: 아이디 */}
                <UserName>{data.userName}</UserName>
              </LeftLayout>

              {/* 🟡 중앙 */}
              <MiddleLayout>
                {/* FIXME: 유저 정보 */}
                <UserInfo>활동지역: {data.location}</UserInfo>
                <UserInfo>나이대: {data.age}</UserInfo>
                <UserInfo>사용언어: {data.languages}</UserInfo>
              </MiddleLayout>

              {/* 🟡 우측 */}
              <RightLayout>
                {/* 가이드 횟수 | 평점 */}
                <RightTop>
                  <Partition>
                    <Title>가이드 횟수</Title>
                    {/* FIXME: 가이드 횟수 */}
                    <TitleValue>{data.guideCount}</TitleValue>
                  </Partition>

                  <Partition>
                    <Title>평점</Title>
                    {/* FIXME: 평점 */}
                    <TitleValue>{data.rating}</TitleValue>
                  </Partition>
                </RightTop>
                {/* 사용자 태그 */}
                <RightBottom>
                  {/* FIXME: 태그 */}
                  {data.tags.map((tag) => (
                    <Tag>#{tag}</Tag>
                  ))}
                </RightBottom>
              </RightLayout>
            </CardContainer>
          </CardLayout>
        )
      })}
    </>
  )
}

export default GuideCard

const RightSectionTitle = styled.div`
  font-size: 50px;
  margin-bottom: 3rem;
`

const CardLayout = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #f7fa4e; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`
/* Flex | justify-content | align-items*/
const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardContainer = styled(FlexCenter)`
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  border-bottom: 2px solid #dddddd;
  /* background-color: #605e5e; */
  justify-content: flex-start;
  position: relative;
`
const Temperature = styled(FlexCenter)`
  position: absolute;
  width: 80px;
  height: 80px;
  right: -1rem;
  top: -0.5rem;
  font-size: 1.2rem;
  border-radius: 50%;
  color: white;
  background-color: #f55757;
  box-shadow: 5px 5px 5px 5px #dddddd;
`

/* 🟡 왼쪽 */
const LeftLayout = styled(FlexCenter)`
  width: 20%;
  padding: 1rem;
  box-sizing: border-box;
  flex-direction: column;
  /* background-color: #f35454; */
`

const UserImageLayout = styled.div`
  /* background-color: #54f55f; */
  border: 3px solid black;
  border-radius: 15%;
  width: 150px;
  height: 150px;
  position: relative;
`

// 성별에 따른 색상 변경
const GenderMarker = styled.div<{ sex: string }>`
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-color: ${({ sex }) => (sex === 'male' ? '#4bb3ff' : '#ff8090')};
  /* background-color: #4bb3ff; */ // 남자
  /* background-color: #ff8090; */ // 여자
  border-radius: 50%;
  top: -15px;
  right: -15px;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`

const UserName = styled(FlexCenter)`
  padding: 1rem 0;
  font-size: 1.5rem;
  width: 100%;
`

/* 🟡 중앙 */
const MiddleLayout = styled.div`
  /* width: 40%; */
`

const UserInfo = styled(FlexCenter)`
  font-size: 1.5rem;
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  text-align: left;
  justify-content: flex-start;
  /* background-color: #fff; */
`

/* 🟡 오른쪽 */
const RightLayout = styled(FlexCenter)`
  width: 40%;
  /* background-color: #39f78c; */
  flex-direction: column;
`
const RightTop = styled(FlexCenter)`
  width: 100%;
  /* background-color: #fff; */
  justify-content: space-around;
  margin-bottom: 30px;
`

const Partition = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  /* background-color: red; */
`
const Title = styled(FlexCenter)`
  font-size: 2rem;
`
const TitleValue = styled(FlexCenter)`
  font-size: 1.5rem;
`

const RightBottom = styled(FlexCenter)`
  width: 100%;
  /* background-color: blueviolet; */
  flex-wrap: wrap;
`
const Tag = styled.button`
  text-align: center;
  display: inline-block;
  border: 2px solid black;
  border-radius: 2rem;
  padding: 10px 20px;
  min-width: 1.7rem;
  white-space: nowrap;
  box-shadow: 2px 2px 2px 2px gray;
`

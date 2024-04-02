import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import userImage from 'assets/userImage.svg'
import logo from 'assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { getGuideList } from 'api/GuidePageAPI'
import moment from 'moment'
const GuideCard = () => {
  const [guideDatas, setGuideDatas] = useState<any[]>([])
  console.log('guideDatas: ', guideDatas)

  useEffect(() => {
    const fetchGuideList = async () => {
      try {
        // const result = await getGuideList() // 비동기 함수의 결과를 기다림
        const result = await getGuideList({ cursor: 64, limit: 3 }) // 비동기 함수의 결과를 기다림
        setGuideDatas(result)
        return result
      } catch (error) {
        console.error('Error fetching guide list:', error) // 오류 처리
      }
    }

    fetchGuideList()
  }, [])

  //  테스트 데이터
  const navigate = useNavigate()

  const calculateAge = (birthdate: string) => {
    return moment().diff(moment(birthdate), 'years')
  }

  return (
    <>
      <RightSectionTitle>{`SoomGa의 가이드님, ${guideDatas.length} 명`}</RightSectionTitle>
      {guideDatas.map((guideData) => {
        return (
          <CardLayout key={guideData.id} onClick={() => navigate(`/guides/detail/${guideData.id}`)}>
            <CardContainer>
              {/* FIXME: 온도 */}
              <Temperature>{`${guideData.guideProfile.temperature}°C`}</Temperature>
              {/* 🟡 왼쪽 */}
              <LeftLayout>
                <UserImageLayout>
                  <ImageWrapper>
                    {/* <GenderMarker sex={guideData.sex} /> */}
                    <GenderMarker sex={`일단 보류`} />
                    {/* FIXME: 이미지 */}
                    {guideData.avatar ? (
                      <img src={guideData.avatar} alt="userImage" />
                    ) : (
                      <img src={userImage} alt="userImage" />
                    )}
                  </ImageWrapper>
                </UserImageLayout>
                {/* FIXME: 아이디 */}
                <UserName>{guideData.nickname}</UserName>
              </LeftLayout>

              {/* 🟡 중앙 */}
              <MiddleLayout>
                {/* FIXME: 유저 정보 */}
                <UserInfo>
                  활동지역: {guideData.guideProfile.areas?.map((area: any) => area.area.name).join(', ')}
                </UserInfo>
                <UserInfo>나이: {calculateAge(guideData.birthdate)} 세</UserInfo>

                <UserInfo>
                  사용언어: {guideData.languages?.map((language: any) => language.language.name).join(', ')}
                </UserInfo>
              </MiddleLayout>

              {/* 🟡 우측 */}
              <RightLayout>
                {/* 가이드 횟수 | 평점 */}
                <RightTop>
                  <Partition>
                    <Title>가이드 횟수</Title>
                    {/* FIXME: 가이드 횟수 */}
                    <TitleValue>{guideData.guideCount}</TitleValue>
                    {/* <TitleValue>{guideData.guideCount}</TitleValue> */}
                  </Partition>

                  <Partition>
                    <Title>평점</Title>
                    <TitleValue>{guideData.totalAvgScore}</TitleValue>
                  </Partition>
                </RightTop>
                {/* 사용자 태그 */}
                <RightBottom>
                  {guideData.tags.map((tag: any) => (
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
  font-size: 2rem;
  /* margin-bottom: 1rem; */
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
  cursor: pointer;
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
  /* background-color: mediumaquamarine; */
  justify-content: flex-start;
  position: relative;
`
const Temperature = styled(FlexCenter)`
  position: absolute;
  width: 3rem;
  height: 3rem;
  right: 1rem;
  top: 1rem;
  font-size: 1rem;
  border-radius: 50%;
  color: white;
  background-color: #f55757;
  box-shadow: 3px 3px 3px 3px #dddddd;
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
  width: 7rem;
  height: 7rem;
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
  font-size: 1.3rem;
  width: 100%;
`

/* 🟡 중앙 */
const MiddleLayout = styled.div`
  width: 30%;
`

const UserInfo = styled(FlexCenter)`
  font-size: 1rem;
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
  /* padding: 1rem; */
  box-sizing: border-box;
  /* background-color: red; */
`
const Title = styled(FlexCenter)`
  font-size: 1.3rem;
`
const TitleValue = styled(FlexCenter)`
  font-size: 1.1rem;
`

const RightBottom = styled(FlexCenter)`
  width: 100%;
  /* background-color: blueviolet; */
  flex-wrap: wrap;
  gap: 0.6rem;
`
const Tag = styled.button`
  background-color: #fff;
  text-align: center;
  display: inline-block;
  border: 1px solid black;
  border-radius: 2rem;
  padding: 0.2rem 0.7rem;
  min-width: 1.7rem;
  white-space: nowrap;
  box-shadow: 1px 1px gray;
`

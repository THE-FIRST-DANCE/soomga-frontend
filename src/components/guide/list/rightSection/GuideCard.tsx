import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import userImage from 'assets/userImage.svg'
import { useNavigate } from 'react-router-dom'
import { getGuideList } from 'api/GuidePageAPI'
import moment from 'moment'
import useObserver from 'hooks/useObserver'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedDatasState } from 'state/store/SelecteddatasAtom'

const GuideCard = () => {
  const navigate = useNavigate()

  const [guideDatas, setGuideDatas] = useState<any[]>([]) // 가이드 데이터
  // console.log('가이드 데이터: ', guideDatas)

  const [noData, setNoData] = useState('')

  const [nowCursor, setNowCursor] = useState<number | any>() // 페이지네이션 커서

  const [selectedDatas, setSelectedDatas] = useRecoilState(selectedDatasState)

  console.log('⭐️리코일에 저장된 값 : ', selectedDatas)

  // fetchSelectedGuideList에서 rating의 booleanr값을 정수로 변환
  const selectedRatingsRating = selectedDatas.rating
    .map((val, index) => (val ? index + 1 : null))
    .filter((val) => val !== null) // null 아닌거 거르기
    .join(',') // 배열로 안줄라면

  /* 데이터 요청 */

  // 🟡 데이터 가져오기  🟡
  const fetchOriginalGuideList = useCallback(async () => {
    try {
      const requestParams = {
        age: selectedDatas.age.join('-'),
        // temperature: '30-41',
        temperature: selectedDatas.temperature.join('-'),
        guideCount: selectedDatas.guideCount.join('-'),
        // guideCount: undefined,
        gender: selectedDatas.gender.male ? 'MALE' : selectedDatas.gender.female ? 'FEMALE' : undefined,
        areas: selectedDatas.areas.toString(),
        languages: selectedDatas.languages.toString(),
        guideCeritifications: selectedDatas.guideCeritifications.toString(),
        rating: selectedRatingsRating,
      }
      console.log('🟢 보낼 값 🟢 ', requestParams)

      console.log(selectedDatas.age.length, selectedDatas.temperature.length, selectedDatas.guideCount.length)

      const result = await getGuideList({ cursor: nowCursor, limit: 4, requestParams })
      console.log('🟠 받아온 값 🟠', result)

      setNowCursor(result.nextCursor)

      // if (result.items.length === 0) {
      //   setNoData('데이터 없음')
      //   setGuideDatas(() => [])
      //   return
      // }

      if (selectedDatas.isClick) {
        // if (selectedDatas.isClick && result.items.length !== 0) {
        /* 검색 버튼 눌렀을 때 */
        console.log('🔶🔶🔶🔶🔶')
        if (
          selectedDatas.age.length == 0 &&
          selectedDatas.temperature.length == 0 &&
          selectedDatas.guideCount.length == 0
        ) {
          return setGuideDatas((prev) => [...prev, ...result.items])
        }
        setNowCursor(null)
        setGuideDatas(() => [])
        setGuideDatas((prev) => [...prev, ...result.items])
      } else {
        /* 검색 버튼 안눌렀을 때 */
        // setNowCursor(null)
        console.log('🔵🔵🔵🔵')
        setGuideDatas((prev) => [...prev, ...result.items])
      }
      setNoData('')
      // return result
    } catch (error) {
      console.error('🔴🔴필터링 리스트 에러🔴🔴 :', error)
    }
    // }, [selectedDatas])
  }, [nowCursor, selectedDatas])

  useEffect(() => {
    // console.log('🟣🟣🟣selectedDatas 업데이로 실행 🟣🟣🟣:', selectedDatas)
    window.scrollTo({ top: 100 })
    fetchOriginalGuideList()
  }, [selectedDatas])

  // 객체 감지 Ref
  const originObserveRef = useObserver(fetchOriginalGuideList)

  // 나이 계산
  const calculateAge = (birthdate: string) => {
    return moment().diff(moment(birthdate), 'years')
  }

  return (
    <>
      <RightSectionTitle>{`SoomGa의 가이드님, ${guideDatas.length} 명`}</RightSectionTitle>

      {guideDatas.length === 0 || noData === '데이터 없음' ? (
        <Nodata>일치하는 데이터가 없습니다....</Nodata>
      ) : (
        guideDatas.map((guideData, i) => {
          return (
            <CardLayout key={`CardLayout${i}`} onClick={() => navigate(`/guides/detail/${guideData.id}`)}>
              <CardContainer>
                <Temperature>{`${guideData.temperature}°C`}</Temperature>
                {/* 🟡 왼쪽 */}
                <LeftLayout>
                  <UserImageLayout>
                    <ImageWrapper>
                      <GenderMarker gender={guideData.member.gender} />
                      {/* <GenderMarker gender={`일단 보류`} /> */}

                      {guideData.member.avatar ? (
                        <img src={guideData.member.avatar} alt="userImage" />
                      ) : (
                        <img src={userImage} alt="userImage" />
                      )}
                    </ImageWrapper>
                  </UserImageLayout>

                  <UserName>{guideData.member.nickname}</UserName>
                </LeftLayout>

                {/* 🟡 중앙 */}
                <MiddleLayout>
                  <UserInfo>활동지역: {guideData.areas?.map((area: any) => area.area.name).join(', ')}</UserInfo>
                  <UserInfo>나이: {calculateAge(guideData.member.birthdate)} 세</UserInfo>

                  <UserInfo>
                    사용언어: {guideData.member.languages?.map((language: any) => language.language.name).join(', ')}
                  </UserInfo>
                </MiddleLayout>

                {/* 🟡 우측 */}
                <RightLayout>
                  {/* 가이드 횟수 | 평점 */}
                  <RightTop>
                    <Partition>
                      <Title>가이드 횟수</Title>
                      {/* FIXME: 가이드 횟수  FIXME: */}
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
                    {guideData.member.tags.map((tag: any) => (
                      <Tag>#{tag}</Tag>
                    ))}
                  </RightBottom>
                </RightLayout>
              </CardContainer>
            </CardLayout>
          )
        })
      )}
      <div style={{ height: '1px', width: '100%' }} ref={originObserveRef}></div>
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

const Nodata = styled(FlexCenter)`
  width: 100%;

  font-size: 1.5rem;
  margin-top: 3rem;
  color: #dddddd;
  /* background-color: red; */
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
const GenderMarker = styled.div<{ gender: string }>`
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-color: ${({ gender }) => (gender === 'MALE' ? '#4bb3ff' : '#ff8090')};
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

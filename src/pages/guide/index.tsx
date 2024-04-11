import MagnifieirIcon from 'components/home/MagnifieirIcon'
import styled from 'styled-components'
import { useState } from 'react'
import useGuideStateMethods from '../../components/guide/list/leftSection/GuidePageUtils'
import RangeComponent from '../../components/guide/list/leftSection/RangeComponent'
import CheckboxComponent from '../../components/guide/list/leftSection/CheckboxComponent' // 이름 변경

import Star from 'components/icons/Star'
import RatingFakeCheckbox from '../../components/guide/list/leftSection/RatingFakeCheckbox'
import GuideCard from '../../components/guide/list/rightSection/GuideCard'
import { useRecoilState } from 'recoil'
import { selectedDatasState } from 'state/store/SelecteddatasAtom'

const GuidePage = () => {
  const {
    /* useState */
    age,
    ageRange, // 나이
    temperature,
    temperatureRange, // 온도
    guideCount,
    guideCountRange, // 가이드 횟수
    isAllChecked, // 모두
    isManChecked, // 남자
    isWomanChecked, // 여자
    areasDatas,
    onChangeRange,
    onClickGender,
    onChangeCheckBox,
    languageDatas,
    CredentialsDatas,
    isRatingChecked, // 평점
    setIsRatingChecked,
  } = useGuideStateMethods()

  // 지역
  const [isRegionClick, setIsRegionClick] = useState<boolean>(true) // 토굴
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]) // 선택된 지역

  // 언어
  const [isLanguageClick, setIsLanguageClick] = useState<boolean>(true) //토굴
  const [selectedLanguages, setSelectedLanguages] = useState<number[]>([]) // 선택된 언어

  // 자격증
  const [isCredentialsClick, setIsCredentialsClick] = useState<boolean>(true) //  토굴
  const [selectedCredentials, setSelectedCredentials] = useState<number[]>([]) // 선택된 자격증

  const [selectedDatas, setSelectedDatas] = useRecoilState(selectedDatasState)
  /* 선택된 데이터들 */
  let selectedDatasObj = {
    // isClick: !selectedDatas.isClick,
    isClick: true,
    age: ageRange,
    temperature: temperatureRange,
    guideCount: guideCountRange,
    gender: { all: isAllChecked, male: isManChecked, female: isWomanChecked },
    areas: selectedRegions,
    languages: selectedLanguages,
    credentials: selectedCredentials,
    rating: isRatingChecked,
  }
  console.log('🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢selectedDatasObj: ', selectedDatasObj)

  return (
    <>
      <Blank />
      <GuidePageLayout>
        {/* 🟢🟢🟢 왼쪽 🟢🟢🟢 */}
        <LeftSection>
          {/* 🟠 1. Search (text)  🟠 */}
          <SearchTagContainer>
            <MagnifieirIcon $width="40px" $height="40px" $fill="red" />
            <span className="searchLetter">Search</span>
          </SearchTagContainer>
          {/* 🟠 2. 범위 선택 (range) : 나이 | 온도 | 가이드 횟수  🟠  */}
          <Layout>
            {/* 1. Age */}
            <RangeComponent
              title="나이"
              rangeValues={ageRange}
              value={age}
              name="age"
              max="70"
              // min="10"
              min="0"
              step="10"
              onChange={onChangeRange}
            />

            {/* 2. Temperature */}
            <RangeComponent
              title="온도"
              rangeValues={temperatureRange}
              value={temperature}
              name="temperature"
              max="70"
              min="0"
              step="10"
              onChange={onChangeRange}
            />

            {/* 3. Guide Count */}
            <RangeComponent
              title="가이드 횟수"
              rangeValues={guideCountRange}
              value={guideCount}
              name="guideCount"
              max="80"
              min="0"
              step="10"
              onChange={onChangeRange}
            />

            {/* 🟠  3. 성별 선택 (checkBox) : 전부 | 남자 | 여자 🟠  */}
            <RadioButtonsContainer>
              <Container>
                <LangeTitle>성별</LangeTitle>
                <GenderWrapper>
                  <CheckboxComponent
                    id="all"
                    name="all"
                    checked={isAllChecked}
                    onChange={onChangeCheckBox}
                    onClick={onClickGender}
                    label="전부"
                  />

                  {/* 3.2 남자 */}
                  <CheckboxComponent
                    id="MALE"
                    name="MALE"
                    checked={isManChecked}
                    onChange={onChangeCheckBox}
                    onClick={onClickGender}
                    label="남자"
                  />

                  {/* 3.3 여자 */}
                  <CheckboxComponent
                    id="FEMALE"
                    name="FEMALE"
                    checked={isWomanChecked}
                    onChange={onChangeCheckBox}
                    onClick={onClickGender}
                    label="여자"
                  />
                </GenderWrapper>
              </Container>
            </RadioButtonsContainer>

            {/*  🟠  4. 지역 선택 : 8도 🟠  */}
            <RegionsContainer>
              {/* 하얀색으로 감싸는 부분 */}
              <Container>
                <LangeTitle>지역</LangeTitle>
                <SelectContainer onClick={() => setIsRegionClick(!isRegionClick)}>
                  <PlaceholderOfSelect>지역을 선택하세요</PlaceholderOfSelect>
                  {isRegionClick ? (
                    <TriangleIcon onClick={() => setIsRegionClick(!isRegionClick)}>▼</TriangleIcon>
                  ) : (
                    <OnTriangleIcon onClick={() => setIsRegionClick(!isRegionClick)}>▼</OnTriangleIcon>
                  )}
                </SelectContainer>
                {/* 토굴된 지역 선택 */}

                {isRegionClick && (
                  <RegionDropWrapper isRegionClick={isRegionClick}>
                    {areasDatas.map((area: { id: number; name: string }) => {
                      const isSelected = selectedRegions.includes(area.id)

                      return (
                        <RegionIcon
                          key={`areas${area.id}`}
                          isSelected={isSelected}
                          onClick={() => {
                            {
                              selectedRegions.includes(area.id)
                                ? setSelectedRegions((prev) => prev.filter((item) => item !== area.id)) //  있으면 제거
                                : setSelectedRegions((prev) => [...prev, area.id]) // 없으면 추가
                            }
                          }}
                        >
                          {area.name}
                        </RegionIcon>
                      )
                    })}
                  </RegionDropWrapper>
                )}
              </Container>
            </RegionsContainer>

            {/* 🟠  5. 언어 선택 : 한국어 | 영어 | 일본어 🟠   */}
            <LanguageContainer>
              {/* 하얀색으로 감싸는 부분 */}
              <Container>
                <LangeTitle>언어</LangeTitle>
                <SelectContainer onClick={() => setIsLanguageClick(!isLanguageClick)}>
                  <PlaceholderOfSelect>언어을 선택하세요</PlaceholderOfSelect>
                  {isLanguageClick ? (
                    <TriangleIcon onClick={() => setIsLanguageClick(!isLanguageClick)}>▼</TriangleIcon>
                  ) : (
                    <OnTriangleIcon onClick={() => setIsLanguageClick(!isLanguageClick)}>▼</OnTriangleIcon>
                  )}
                </SelectContainer>
                {/* 토굴된 지역 선택 */}

                {isLanguageClick && (
                  <RegionDropWrapper isRegionClick={isLanguageClick}>
                    {languageDatas.map((language) => {
                      const isSelected = selectedLanguages.includes(language.id)

                      return (
                        <RegionIcon
                          key={language.id}
                          isSelected={isSelected}
                          onClick={() => {
                            {
                              selectedLanguages.includes(language.id)
                                ? setSelectedLanguages((prev) => prev.filter((item) => item !== language.id)) //  있으면 제거
                                : setSelectedLanguages((prev) => [...prev, language.id]) // 없으면 추가
                            }
                          }}
                        >
                          {language.name}
                        </RegionIcon>
                      )
                    })}
                  </RegionDropWrapper>
                )}
              </Container>
            </LanguageContainer>

            {/* 🟠 6. 자격증 선택 :   영어 | 일본어 🟠   */}
            <CredentialsContainer>
              {/* 하얀색으로 감싸는 부분 */}
              <Container>
                <LangeTitle>자격증</LangeTitle>
                <SelectContainer>
                  <PlaceholderOfSelect onClick={() => setIsCredentialsClick(!isCredentialsClick)}>
                    자격증을 선택하세요
                  </PlaceholderOfSelect>
                  {isCredentialsClick ? (
                    <TriangleIcon onClick={() => setIsCredentialsClick(!isCredentialsClick)}>▼</TriangleIcon>
                  ) : (
                    <OnTriangleIcon onClick={() => setIsCredentialsClick(!isCredentialsClick)}>▼</OnTriangleIcon>
                  )}
                </SelectContainer>

                {/* 자격증 데이터 */}
                {isCredentialsClick && (
                  <CredentialDropWrapper isRegionClick={isCredentialsClick}>
                    {/* 일본어 */}
                    <LanguageTitle>日本語(JLPT) 🇯🇵</LanguageTitle>
                    {/* <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div> */}
                    <Scores>
                      {CredentialsDatas.japanesse.map((language) => {
                        const isSelected = selectedCredentials.includes(language.id)

                        return (
                          <Credential
                            key={language.id}
                            isSelected={isSelected}
                            onClick={() => {
                              {
                                selectedCredentials.includes(language.id)
                                  ? setSelectedCredentials((prev) => prev.filter((item) => item !== language.id)) //  있으면 제거
                                  : setSelectedCredentials((prev) => [...prev, language.id]) // 없으면 추가
                              }
                            }}
                          >
                            {language.name}
                          </Credential>
                        )
                      })}
                    </Scores>

                    {/* 영어 */}
                    <LanguageTitle>English(TOEIC) 🇬🇧 </LanguageTitle>
                    <Scores>
                      {CredentialsDatas.english.map((language) => {
                        const isSelected = selectedCredentials.includes(language.id)

                        return (
                          <Credential
                            key={language.id}
                            isSelected={isSelected}
                            onClick={() => {
                              {
                                selectedCredentials.includes(language.id)
                                  ? setSelectedCredentials((prev) => prev.filter((item) => item !== language.id)) //  있으면 제거
                                  : setSelectedCredentials((prev) => [...prev, language.id]) // 없으면 추가
                              }
                            }}
                          >
                            {language.name}
                          </Credential>
                        )
                      })}
                    </Scores>
                  </CredentialDropWrapper>
                )}
              </Container>
            </CredentialsContainer>

            {/* 🟠  7. 평점 선택 🟠   */}
            <RadioButtonsContainer>
              <Container>
                <LangeTitle>평점</LangeTitle>
                <StarWrapper>
                  {/* 별들 삽입 */}
                  {Array.from({ length: 5 }, (_, totalindex) => (
                    <StartCheckBoxContainer key={totalindex + 1}>
                      <input
                        type="checkbox"
                        id={`star${totalindex}`}
                        name={`star${totalindex}`}
                        style={{ display: 'none' }}
                      />
                      <RatingFakeCheckbox
                        name={`star${totalindex}`}
                        onClick={() => {
                          setIsRatingChecked((prevState) => {
                            const newState = [...prevState]
                            newState[totalindex] = !newState[totalindex]
                            return newState
                          })
                        }}
                        checked={isRatingChecked[totalindex]}
                      />

                      <div>
                        {Array.from({ length: totalindex + 1 }, (_, index) => (
                          <label
                            key={index}
                            htmlFor={`star${totalindex}`}
                            onClick={() => {
                              setIsRatingChecked((prevState) => {
                                const newState = [...prevState]
                                newState[totalindex] = !newState[totalindex]
                                return newState
                              })
                            }}
                          >
                            <Star key={index} $width="35px" $height="35px" $color="var(--color-primary)" />
                          </label>
                        ))}
                      </div>
                    </StartCheckBoxContainer>
                  )).reverse()}
                </StarWrapper>
              </Container>
            </RadioButtonsContainer>
          </Layout>

          {/*  ⭐️ 버튼  ⭐️*/}
          <BtnWrapper>
            <SearchBtn
              onClick={() => {
                setSelectedDatas((prev): any => {
                  return { ...prev, ...selectedDatasObj }
                })
              }}
            >
              검색
            </SearchBtn>
          </BtnWrapper>
        </LeftSection>

        {/* 🟢🟢🟢 오른쪽 🟢🟢🟢 */}
        <RightSection>
          {/* <RightSectionTitle>총 ??? 명</RightSectionTitle> */}
          <GuideCard />
        </RightSection>
      </GuidePageLayout>
    </>
  )
}

export default GuidePage

/* ----------------------------- 💅 StyledComponent -----------------------------*/

const GuidePageLayout = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  margin: 0 auto;
`

// top에 여백用
const Blank = styled.div`
  width: 100%;
  height: 10rem;
`
/* 🟡🟡🟡🟡🟡 왼쪽 🟡🟡🟡🟡🟡 */
const LeftSection = styled.div`
  width: 27%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  /* background-color: #fedf41; */
`

const SearchTagContainer = styled.div`
  width: 100%;
  height: 50px;
  /* background-color: #fff; */
  border-bottom: 5px solid var(--color-original);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;

  .searchLetter {
    /* font-size: 50px; */
    /* margin-left: 1rem; */
    font-size: 2.1rem;

    color: var(--color-original);
  }
`

/* 🟠 COMMON 🟠 */

// 전체 레이아웃
const Layout = styled.div`
  width: 100%;
  /* background-color: #4ff643; */
  margin-bottom: 2rem;
  /* padding: 10px; */
  /* box-sizing: border-box; */
`

// 컨테이너🟠
export const Container = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #ffffff; */
  margin-bottom: 1.5rem;
`

// 범주 타이틀🟠
export const LangeTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-left: 10px;
  /* margin-bottom: 0.1rem; */
`

// input 전체 감싸기🟠
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #3bd2ea; */
  border: 3px solid var(--bs-gray);
  border-radius: 0.6rem;
  padding: 0.4rem 0.6rem;
  /* padding: 20px; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`

/*  🟠  성별 선택 (checkBox) : 전부 | 남자 | 여자 🟠 */

const RadioButtonsContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`

const GenderWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

/* 🟠   4. 지역 선택 : 8도  🟠  */
const RegionsContainer = styled(Container)`
  width: 100%;
  /* margin-top: 1rem; */
  margin-bottom: 0;
`

const SelectContainer = styled.div`
  width: 100%;
  /* background-color: #3bd2ea; */
  border: 3px solid var(--bs-gray);
  border-radius: 0.5rem;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`

const RegionIcon = styled.button<{ isSelected: boolean }>`
  text-align: center;
  display: inline-block;
  border: 2px solid black;
  border-radius: 2rem;
  padding: 10px 20px;
  background-color: ${({ isSelected }) => (isSelected ? '#fef4ba' : 'white')};
  min-width: 1.7rem; // 이 줄을 추가하여 최소 너비를 설정합니다.
  white-space: nowrap;
`

const PlaceholderOfSelect = styled.div`
  /* background-color: #7de0b4; */
  width: 85%;
  padding: 5px;
  display: flex;
  gap: 1rem;
  overflow: hidden;
`

const TriangleIcon = styled.span`
  font-size: 1rem;
  color: var(--color-original);
  transition: transform 1s;
`

const OnTriangleIcon = styled(TriangleIcon)`
  transform: rotate(90deg);
  /* transition: transform 1s; */
`

const RegionDropWrapper = styled(Wrapper)<{ isRegionClick: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* 자동으로 크기 조절하며 최소 100px 너비를 유지 */
  gap: 10px; /* 그리드 아이템 사이의 간격 */
  justify-content: space-around;
  width: 100%;
  background-color: transparent;
  opacity: ${({ isRegionClick }) => (isRegionClick ? '1' : '0')};
  transition: opacity 1s;
  grid-auto-flow: row;
`

/* 🟠  5. 언어 선택 : 한국어 | 영어 | 일본어 🟠 */
const LanguageContainer = styled(Container)`
  width: 100%;
  /* margin-top: 150px; */
`

const LanguageTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  /* background-color: red; */
  grid-column: span 4;
`

/* 🟠 6. 자격증 선택 :  영어 | 일본어 🟠  */
const CredentialsContainer = styled(Container)`
  width: 100%;
  /* background-color: mediumaquamarine; */
  /* margin-top: 150px; */
`

const CredentialDropWrapper = styled.div<{ isRegionClick: boolean }>`
  border: 3px solid var(--bs-gray);
  border-radius: 0.6rem;
  padding: 0.7rem;
  box-sizing: border-box;
`
const Scores = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
`

const Credential = styled.button<{ isSelected: boolean }>`
  text-align: center;
  margin-right: 0.4rem;
  display: inline-block;
  border: 2px solid black;
  border-radius: 2rem;
  padding: 10px 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#fef4ba' : 'white')};
  min-width: 1.7rem; // 이 줄을 추가하여 최소 너비를 설정합니다.
  white-space: nowrap;
`

/* 🟠  7. 평점 선택 🟠   */
const StarWrapper = styled(Wrapper)`
  display: flex;
`

const StartCheckBoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const SearchBtn = styled.button`
  cursor: pointer;
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: 700;
  border: 3px solid var(--bs-gray);
  border-radius: 0.6rem;
  &:active {
    transform: translateX(0.1rem) translateY(0.1rem);
  }
`

/* 🟡 오른쪽 */
const RightSection = styled.div`
  width: 70%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
`

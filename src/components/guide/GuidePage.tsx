import MagnifieirIcon from 'components/home/MagnifieirIcon'
import { styled } from 'styled-components'
import { useState } from 'react'
import useGuideStateMethods from './leftSection/GuidePageUtils'
import RangeComponent from './leftSection/RangeComponent'
import CheckboxComponent from './leftSection/CheckboxComponent' // 이름 변경

import Star from 'components/icons/Star'
import RatingFakeCheckbox from './leftSection/RatingFakeCheckbox'
import GuideCard from './rightSection/GuideCard'

const GuidePage = () => {
  const {
    /* useState */
    age,
    ageRange,
    temperature,
    temperatureRange,
    guideCount,
    guideCountRange,
    isAllChecked,
    isManChecked,
    isWomanChecked,
    regionsDatas,
    onChangeRange,
    onClickGender,
    onChangeCheckBox,
    languageDatas,
    CredentialsDatas,
    isRatingChecked,
    setIsRatingChecked,
  } = useGuideStateMethods()

  // 지역
  const [isRegionClick, setIsRegionClick] = useState<boolean>(true) // 토굴
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]) // 선택된 지역

  // 언어
  const [isLanguageClick, setIsLanguageClick] = useState<boolean>(true) //토굴
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]) // 선택된 언어

  // 자격증
  const [isCredentialsClick, setIsCredentialsClick] = useState<boolean>(true) //  토굴
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>([]) // 선택된 자격증

  // 평점

  const [selectedRating, setSelectedRating] = useState<string[]>([]) // 선택된 자격증

  return (
    <>
      <Blank />
      <GuidePageLayout>
        {/* 🟢🟢🟢 왼쪽 🟢🟢🟢 */}
        <LeftSection>
          {/* 🟠 1. Search (text)  🟠 */}
          <SearchTagContainer>
            <MagnifieirIcon width="50px" height="50px" background-color="red" />
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
              min="10"
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
              min="10"
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
              min="10"
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
                    id="man"
                    name="man"
                    checked={isManChecked}
                    onChange={onChangeCheckBox}
                    onClick={onClickGender}
                    label="남자"
                  />

                  {/* 3.3 여자 */}
                  <CheckboxComponent
                    id="woman"
                    name="woman"
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
                    {regionsDatas.map((region) => {
                      const isSelected = selectedRegions.includes(region)

                      return (
                        <RegionIcon
                          key={region}
                          isSelected={isSelected}
                          onClick={() => {
                            {
                              selectedRegions.includes(region)
                                ? setSelectedRegions((prev) => prev.filter((item) => item !== region)) //  있으면 제거
                                : setSelectedRegions((prev) => [...prev, region]) // 없으면 추가
                            }
                          }}
                        >
                          {region}
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
                      const isSelected = selectedLanguages.includes(language)

                      return (
                        <RegionIcon
                          key={language}
                          isSelected={isSelected}
                          onClick={() => {
                            {
                              selectedLanguages.includes(language)
                                ? setSelectedLanguages((prev) => prev.filter((item) => item !== language)) //  있으면 제거
                                : setSelectedLanguages((prev) => [...prev, language]) // 없으면 추가
                            }
                          }}
                        >
                          {language}
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
                  <PlaceholderOfSelect>자격증을 선택하세요</PlaceholderOfSelect>
                  {isCredentialsClick ? (
                    <TriangleIcon onClick={() => setIsCredentialsClick(!isCredentialsClick)}>▼</TriangleIcon>
                  ) : (
                    <OnTriangleIcon onClick={() => setIsCredentialsClick(!isCredentialsClick)}>▼</OnTriangleIcon>
                  )}
                </SelectContainer>

                {/* 자격증 데이터 */}
                {isCredentialsClick && (
                  <RegionDropWrapper isRegionClick={isCredentialsClick}>
                    {/* 일본어 */}
                    <LanguageTitle>日本語🇯🇵</LanguageTitle>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    {CredentialsDatas.japanesse.map((language) => {
                      const isSelected = selectedCredentials.includes(language)

                      return (
                        <RegionIcon
                          key={language}
                          isSelected={isSelected}
                          onClick={() => {
                            {
                              selectedCredentials.includes(language)
                                ? setSelectedCredentials((prev) => prev.filter((item) => item !== language)) //  있으면 제거
                                : setSelectedCredentials((prev) => [...prev, language]) // 없으면 추가
                            }
                          }}
                        >
                          {language}
                        </RegionIcon>
                      )
                    })}
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    {/* 영어 */}
                    <LanguageTitle>English 🇬🇧 </LanguageTitle>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div>

                    {CredentialsDatas.english.map((language) => {
                      const isSelected = selectedCredentials.includes(language)

                      return (
                        <RegionIcon
                          key={language}
                          isSelected={isSelected}
                          onClick={() => {
                            {
                              selectedCredentials.includes(language)
                                ? setSelectedCredentials((prev) => prev.filter((item) => item !== language)) //  있으면 제거
                                : setSelectedCredentials((prev) => [...prev, language]) // 없으면 추가
                            }
                          }}
                        >
                          {language}
                        </RegionIcon>
                      )
                    })}
                  </RegionDropWrapper>
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
                        onClick={(e) => {
                          console.log(totalindex, '개 별 클릭')
                          // console.log('체크 여부 ', e.target.checked)
                          // console.log('어떤 것체크', e.target.name)
                        }}
                      />
                      <RatingFakeCheckbox
                        name={`star${totalindex}`}
                        onClick={() => {
                          console.log('isRatingChecked: ', isRatingChecked)
                          setIsRatingChecked((prevState) => {
                            const newState = [...prevState]
                            newState[totalindex] = !newState[totalindex]
                            return newState
                          })
                        }}
                        checked={isRatingChecked[totalindex]}
                      />
                      {/* if : checked가 되면 fake에도 체크 표시가 되게 */}
                      <div>
                        {Array.from({ length: totalindex + 1 }, (_, index) => (
                          <label
                            htmlFor={`star${totalindex}`}
                            onClick={() => {
                              console.log('isRatingChecked: ', isRatingChecked)
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
  width: 100%;
  height: 100%;
  display: flex;
`

// top에 여백用
const Blank = styled.div`
  width: 100%;
  height: 10rem;
`
/* 🟡 왼쪽 */
const LeftSection = styled.div`
  width: 30%;
  height: 100%;
  padding: 3rem;
  box-sizing: border-box;
  /* display: flex; */
  /* background-color: #fedf41; */
`

const SearchTagContainer = styled.div`
  width: 100%;
  height: 50px;
  /* background-color: #fff; */
  border-bottom: 10px solid var(--color-original);
  padding-bottom: 20px;
  margin-bottom: 80px;
  display: flex;
  gap: 1.5rem;

  .searchLetter {
    font-size: 50px;
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
  box-sizing: border-box;
`

// 컨테이너🟠
export const Container = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #ffffff; */
  margin-bottom: 100px;
`

// 범주 타이틀🟠
export const LangeTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 10px;
`

// input 전체 감싸기🟠
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #3bd2ea; */
  border: 3px solid var(--bs-gray);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`

/*  🟠  성별 선택 (checkBox) : 전부 | 남자 | 여자 🟠 */

const RadioButtonsContainer = styled.div`
  width: 100%;
  margin-top: 150px;
`

const GenderWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const InputCheckBox = styled.input`
  display: none;
`

const Label = styled.label`
  margin-left: -20px;
`

/* 🟠   4. 지역 선택 : 8도  🟠  */
const RegionsContainer = styled(Container)`
  width: 100%;
  margin-top: 150px;
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

const SelectContainer = styled.div`
  width: 100%;
  /* background-color: #3bd2ea; */
  border: 3px solid var(--bs-gray);
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
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
  font-size: 30px;
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
`

/* 🟠  5. 언어 선택 : 한국어 | 영어 | 일본어 🟠 */
const LanguageContainer = styled(Container)`
  width: 100%;
  margin-top: 150px;
`

const LanguageTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`

/* 🟠 6. 자격증 선택 :  영어 | 일본어 🟠  */
const CredentialsContainer = styled(Container)`
  width: 100%;
  margin-top: 150px;
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

/* 🟡 오른쪽 */
const RightSection = styled.div`
  width: 70%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  /* background-color: #3ca7ff; */
  /* display: flex; */
`

import useGuideStateMethods from 'components/guide/list/leftSection/GuidePageUtils'
import { useState } from 'react'
import { styled } from 'styled-components'

interface IsAuthActive {
  phone: boolean
  idCard: boolean
  account: boolean
}

const AuthPresence: IsAuthActive = {
  phone: true,
  idCard: false,
  account: true,
}

const RequestGuidePage = () => {
  const { regionsDatas, languageDatas, CredentialsDatas } = useGuideStateMethods()

  // 지역
  const [isRegionClick, setIsRegionClick] = useState<boolean>(true) // 토굴
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]) // 선택된 지역

  // 언어
  const [isLanguageClick, setIsLanguageClick] = useState<boolean>(true) //토굴
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]) // 선택된 언어

  // 자격증
  const [isCredentialsClick, setIsCredentialsClick] = useState<boolean>(true) //  토굴
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>([]) // 선택된 자격증

  return (
    <>
      <Layout>
        {/* <Blank /> */}
        <TotalTitle>✏️ 가이드 신청하기</TotalTitle>
        {/*  🟠  1. 지역 선택 : 8도 🟠  */}
        <Container>
          <Title>지역</Title>
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

        {/* 🟠  2. 언어 선택 : 한국어 | 영어 | 일본어 🟠   */}
        <LanguageContainer>
          {/* 하얀색으로 감싸는 부분 */}
          <Container>
            <Title>언어</Title>
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

        {/* 🟠 3. 자격증 선택 :   영어 | 일본어 🟠   */}
        <CredentialsContainer>
          {/* 하얀색으로 감싸는 부분 */}
          <Container>
            <Title>자격증</Title>
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
              // <CredentialDropWrapper isRegionClick={isCredentialsClick}>
              <CredentialDropWrapper>
                {/* 일본어 */}
                <LanguageTitle>日本語🇯🇵</LanguageTitle>
                {/* <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div> */}
                <Scores>
                  {CredentialsDatas.japanesse.map((language) => {
                    const isSelected = selectedCredentials.includes(language)

                    return (
                      <Credential
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
                      </Credential>
                    )
                  })}
                </Scores>
                {/* <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div> */}
                {/* 영어 */}
                <LanguageTitle>English 🇬🇧 </LanguageTitle>
                {/* <div style={{ width: '100%', height: '1rem' }}></div>
                    <div style={{ width: '100%', height: '1rem' }}></div> */}
                <Scores>
                  {CredentialsDatas.english.map((language) => {
                    const isSelected = selectedCredentials.includes(language)

                    return (
                      <Credential
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
                      </Credential>
                    )
                  })}
                </Scores>
              </CredentialDropWrapper>
            )}
          </Container>
        </CredentialsContainer>

        {/* 4. 인증 */}
        <AuthContainer>
          <Title>인증</Title>
          <AuthWrapper>
            <AuthType isAuthActive={AuthPresence.phone}>휴대폰 인증</AuthType>
            <AuthType isAuthActive={AuthPresence.idCard}>신분증 인증</AuthType>
            <AuthType isAuthActive={AuthPresence.account}>계좌 인증</AuthType>
          </AuthWrapper>{' '}
        </AuthContainer>
      </Layout>
    </>
  )
}

export default RequestGuidePage

const Layout = styled.div`
  width: 60%;
  height: 100vh;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
  /* background-color: #bc7de9; */
`

const TotalTitle = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`

const Title = styled.div`
  font-size: 1.5rem;
`

// input 전체 감싸기🟠
export const Wrapper = styled.div`
  background-color: blue;
  width: 100%;
  height: 100%;
  border: 3px solid var(--bs-gray);
  border-radius: 0.6rem;
  padding: 0.4rem 0.6rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`

// 컨테이너🟠
export const Container = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`

// 🟠  1. 지역 선택 : 8도 🟠
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
  padding: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#fef4ba' : 'white')};
  /* min-width: 1.7rem; // 이 줄을 추가하여 최소 너비를 설정합니다. */
  width: 5.5rem; // 이 줄을 추가하여 최소 너비를 설정합니다.
  white-space: nowrap;
`

const PlaceholderOfSelect = styled.div`
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
`

// 🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡
const RegionDropWrapper = styled(Wrapper)<{ isRegionClick: boolean }>`
  display: grid;
  /* text-align:center */
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* 자동으로 크기 조절하며 최소 100px 너비를 유지 */
  gap: 10px; /* 그리드 아이템 사이의 간격 */
  justify-content: space-around;
  width: 100%;
  height: 60%;
  background-color: transparent;
  opacity: ${({ isRegionClick }) => (isRegionClick ? '1' : '0')};
  transition: opacity 1s;
  grid-auto-flow: row;
  /* background-color: blue; */
`

/* 🟠  2. 언어 선택 : 한국어 | 영어 | 일본어 🟠 */
const LanguageContainer = styled(Container)`
  width: 100%;
  /* margin-top: 150px; */
`

/* 🟠 3. 자격증 선택 :  영어 | 일본어 🟠  */
const CredentialsContainer = styled(Container)`
  width: 100%;
  /* background-color: mediumaquamarine; */
  /* margin-top: 150px; */
`

const CredentialDropWrapper = styled.div`
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
const LanguageTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  /* background-color: red; */
  grid-column: span 4;
`

/* 🟠 4. 인증 🟠 */
const AuthContainer = styled(Container)`
  /* background-color: mediumpurple; */
  margin: 3rem 0;
`
const AuthWrapper = styled.div`
  /* background-color: #f7f76e; */
  padding: 1rem;
`

const AuthType = styled.span<{ isAuthActive: boolean }>`
  color: ${({ isAuthActive }) => (isAuthActive ? 'black' : 'lightgray')};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  border: 3px solid ${({ isAuthActive }) => (isAuthActive ? 'black' : 'lightgray')};

  grid-column: span 4;
  padding: 0.5rem;
  border-radius: 10px;
  margin-right: 1rem;
`

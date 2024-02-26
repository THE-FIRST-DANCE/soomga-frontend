import { useState } from 'react'

export interface CredentialsData {
  japanesse: string[]
  english: string[]
}
const useGuideStateMethods = () => {
  const [age, setAge] = useState<number>(10) // 나이
  const [ageRange, setAgeRange] = useState<number[]>([10, 19])

  const [temperature, setTemperature] = useState<number>(10) // 온도
  const [temperatureRange, setTemperatureRange] = useState<number[]>([10, 19])

  const [guideCount, setGuideCount] = useState(0) // 가이드 횟수
  const [guideCountRange, setGuideCountRange] = useState<number[]>([0, 9])

  // 성별 체크 박스
  const [isAllChecked, setAllChecked] = useState(false) // 전체
  const [isManChecked, setManChecked] = useState(false) // 남자
  const [isWomanChecked, setWomanChecked] = useState(false) // 여자

  const [isRatingChecked, setIsRatingChecked] = useState<boolean[]>([false, false, false, false, false].reverse())

  // 샘플 데이터
  const [regionsDatas, setRegionsDatas] = useState<string[]>([
    '서울',
    '인천',
    '대전',
    '부산',
    '울산',
    '대구',
    '광주',
    '경기',
    '강원',
    '충남',
    '충북',
    '경북',
    '경남',
    '전북',
    '전남',
    '제주',
  ])

  // 언어 데이터
  const [languageDatas, setLanguageDatas] = useState<string[]>(['한국어', 'English', '日本語'])

  // 자격증 데이터
  const [CredentialsDatas, setCredentialsDatas] = useState<CredentialsData>({
    japanesse: ['N1', 'N2', 'N3', 'N4', 'N5'],
    english: ['900', '800', '700', '600', '500'],
  })

  // 평점

  /* 🔻 Method 🔻*/
  // 범위 선택
  const onChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target
    const intedValue = parseInt(value)

    /* 🟡 나이 */
    if (name === 'age') {
      setAge(intedValue)
      switch (intedValue) {
        case 10:
          setAgeRange([10, 19])
          break
        case 20:
          setAgeRange([20, 29])
          break
        case 30:
          setAgeRange([30, 39])
          break
        case 40:
          setAgeRange([40, 49])
          break
        case 50:
          setAgeRange([50, 59])
          break
        case 60:
          setAgeRange([60, 69])
          break
        case 70:
          setAgeRange([70, 79])
          break
        default:
          break
      }
      /* 🟡 온도 */
    } else if (name === 'temperature') {
      setTemperature(intedValue)
      switch (intedValue) {
        case 10:
          setTemperatureRange([10, 19])
          break
        case 20:
          setTemperatureRange([20, 29])
          break
        case 30:
          setTemperatureRange([30, 39])
          break
        case 40:
          setTemperatureRange([40, 49])
          break
        case 50:
          setTemperatureRange([50, 59])
          break
        case 60:
          setTemperatureRange([60, 69])
          break
        case 70:
          setTemperatureRange([70, 79])
          break
        default:
          break
      }
      /* 🟡 가이드 횟수 */
    } else if (name === 'guideCount') {
      setGuideCount(intedValue)
      switch (intedValue) {
        case 10:
          setGuideCountRange([0, 5])
          break
        case 20:
          setGuideCountRange([6, 10])
          break
        case 30:
          setGuideCountRange([11, 15])
          break
        case 40:
          setGuideCountRange([16, 20])
          break
        case 50:
          setGuideCountRange([21, 25])
          break
        case 60:
          setGuideCountRange([26, 30])
          break
        case 70:
          setGuideCountRange([31, 35])
          break
        case 80:
          setGuideCountRange([36, 40])
          break
        default:
          break
      }
    }
  }

  // 성별 전환 (가상요소 checkbox用)
  const onClickGender = (name: string) => {
    console.log('gender: ', name)

    switch (name) {
      case 'all':
        setAllChecked(!isAllChecked)
        setManChecked(false)
        setWomanChecked(false)
        break
      case 'man':
        setManChecked(!isManChecked)
        setAllChecked(false)
        setWomanChecked(false)
        break
      case 'woman':
        setWomanChecked(!isWomanChecked)
        setAllChecked(false)
        setManChecked(false)
        break
      default:
        break
    }
  }

  // 성별 전환 (label用)
  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    console.log('name, checked: ', name, checked)
    switch (name) {
      case 'all':
        console.log('all 선택됨')
        setAllChecked(checked)
        setManChecked(false)
        setWomanChecked(false)
        break
      case 'man':
        console.log('man 선택됨')
        setManChecked(checked)
        setAllChecked(false)
        setWomanChecked(false)
        break
      case 'woman':
        console.log('woman 선택됨')
        setWomanChecked(checked)
        setAllChecked(false)
        setManChecked(false)
        break

      default:
        break
    }
  }

  return {
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
  }
}

export default useGuideStateMethods

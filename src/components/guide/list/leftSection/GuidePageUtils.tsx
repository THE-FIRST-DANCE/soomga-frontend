import { getAreaDatas } from 'api/GuidePageAPI'
import { useEffect, useState } from 'react'

export interface CredentialsData {
  japanesse: string[]
  english: string[]
}

interface Area {
  id: number
  name: string
}
const useGuideStateMethods = () => {
  const [age, setAge] = useState<number>(0) // 나이
  // const [age, setAge] = useState<number>(10) // 나이
  // const [ageRange, setAgeRange] = useState<number[]>([10, 19])
  const [ageRange, setAgeRange] = useState<number[]>([])

  const [temperature, setTemperature] = useState<number>(0) // 온도
  // const [temperature, setTemperature] = useState<number>(10) // 온도
  // const [temperatureRange, setTemperatureRange] = useState<number[]>([10, 19])
  const [temperatureRange, setTemperatureRange] = useState<number[]>([])

  const [guideCount, setGuideCount] = useState(0) // 가이드 횟수
  // const [guideCountRange, setGuideCountRange] = useState<number[]>([0, 9])
  const [guideCountRange, setGuideCountRange] = useState<number[]>([])

  // 성별 체크 박스
  const [isAllChecked, setAllChecked] = useState(null) // 전체
  const [isManChecked, setManChecked] = useState(null) // 남자
  const [isWomanChecked, setWomanChecked] = useState(null) // 여자

  const [isRatingChecked, setIsRatingChecked] = useState<boolean[]>([null, null, null, null, null].reverse())
  // const [isAllChecked, setAllChecked] = useState(false) // 전체
  // const [isManChecked, setManChecked] = useState(false) // 남자
  // const [isWomanChecked, setWomanChecked] = useState(false) // 여자

  // const [isRatingChecked, setIsRatingChecked] = useState<boolean[]>([false, false, false, false, false].reverse())

  useEffect(() => {
    const fetchAreaData = async () => {
      const data = await getAreaDatas()
      setRegionsDatas(data)
    }

    fetchAreaData() // 호출!!
  }, [age, temperature, guideCount, isAllChecked, isManChecked, isWomanChecked])

  // 지역 데이터
  const [areasDatas, setRegionsDatas] = useState<Area[]>([])

  // 언어 데이터
  // const [languageDatas, setLanguageDatas] = useState<string[]>(['한국어', 'English', '日本語'])

  const [languageDatas, setLanguageDatas] = useState([
    { id: 1, name: '한국어' },
    { id: 2, name: 'English' },
    { id: 3, name: '日本語' },
  ])

  // 자격증 데이터
  const [CredentialsDatas, setCredentialsDatas] = useState({
    english: [
      { id: 7, name: '900' },
      { id: 8, name: '800' },
      { id: 9, name: '700' },
      { id: 10, name: '600' },
      { id: 11, name: '500' },
    ],
    japanesse: [
      { id: 12, name: 'N1' },
      { id: 13, name: 'N2' },
      { id: 14, name: 'N3' },
      { id: 15, name: 'N4' },
      { id: 16, name: 'N5' },
    ],
  })

  // 평점

  /* 🔻 Method 🔻*/
  // 범위 선택
  const onChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value, name } = e.target

    if (value === '') {
      if (name === 'age') {
        setAgeRange([])
      } else if (name === 'temperature') {
        setTemperatureRange([])
      } else if (name === 'guideCount') {
        setGuideCountRange([])
      }
      return
    }

    const intedValue = parseInt(value)

    /* 🟡 나이 */
    if (name === 'age') {
      setAge(intedValue)
      switch (intedValue) {
        case 0:
          setAgeRange([])
          break
        case 10:
          setAgeRange([11, 19])
          break
        case 20:
          setAgeRange([21, 29])
          break
        case 30:
          setAgeRange([31, 39])
          break
        case 40:
          setAgeRange([41, 49])
          break
        case 50:
          setAgeRange([51, 59])
          break
        case 60:
          setAgeRange([61, 69])
          break
        case 70:
          setAgeRange([71, 79])
          break
        default:
          break
      }
      /* 🟡 온도 */
    } else if (name === 'temperature') {
      setTemperature(intedValue)
      switch (intedValue) {
        case 0:
          setTemperatureRange([])
          break
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
        case 0:
          setGuideCountRange([])
          break
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
    switch (name) {
      case 'all':
        setAllChecked(!isAllChecked)
        setManChecked(false)
        setWomanChecked(false)
        break
      case 'MALE':
        setManChecked(!isManChecked)
        setAllChecked(false)
        setWomanChecked(false)
        break
      case 'FEMALE':
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
    switch (name) {
      case 'all':
        setAllChecked(checked)
        setManChecked(false)
        setWomanChecked(false)
        break
      case 'MALE':
        setManChecked(checked)
        setAllChecked(false)
        setWomanChecked(false)
        break
      case 'FEMALE':
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
    areasDatas,
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

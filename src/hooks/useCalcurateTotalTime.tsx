import { useMemo } from 'react'
import { PlanListItem } from 'state/store/PlanList'
import useLanguage from './useLanguage'

const messages = {
  'ko-KR': {
    hour: '시간',
    minute: '분',
  },
  'en-US': {
    hour: 'hr',
    minute: 'min',
  },
  'ja-JP': {
    hour: '時間',
    minute: '分',
  },
}

const useCalculateTotalTime = (list: PlanListItem[]) => {
  const [language] = useLanguage()
  const message = messages[language]

  return useMemo(() => {
    const totalMinutes = list.reduce((acc, item) => {
      const [hours, minutes] = item.stayTime
        .split('시간')
        .map((part) => part.trim())
        .map((part, index) => {
          if (index === 0) {
            // 시간 처리
            return parseInt(part) * 60 // 시간을 분으로 변환
          } else {
            // 분 처리
            return parseInt(part.split('분')[0].trim()) // 분만 추출하여 숫자로 변환
          }
        })

      return acc + hours + minutes // 총 분으로 합산
    }, 0)

    // 총 시간을 문자열로 변환
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}${message.hour} ${minutes}${message.minute}` // 문자열 형태로 반환
  }, [list])
}

export default useCalculateTotalTime

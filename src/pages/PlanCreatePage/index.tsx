import GoogleMapLoad from 'components/planner/GoogleMap'
import Places from 'components/planner/place/PlaceTab'
import PlanLeftTab from 'components/planner/PlanLeftTab'
import PlanOrder from 'components/planner/PlanOrder'
import SelectTransportation from 'components/planner/SelectTransportation'
import useLanguage from 'hooks/useLanguage'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { CurrentPeriod, PlanInfo } from 'state/store/PlanInfo'
import { PeriodPlanRecoil } from 'state/store/PlanList'
import styled from 'styled-components'

const messages = {
  'ko-KR': {
    next: '다음',
    prev: '이전',
    confirm: '정말 나가시겠습니까?',
  },
  'en-US': {
    next: 'Next',
    prev: 'Previous',
    confirm: 'Are you sure you want to leave?',
  },
  'ja-JP': {
    next: '次へ',
    prev: '前へ',
    confirm: '本当に終了しますか？',
  },
}

const PlanCreatePage = () => {
  const plan = useRecoilValue(PlanInfo)
  const planPeriod = useRecoilValue(PeriodPlanRecoil)
  const currentPeriod = useRecoilValue(CurrentPeriod)
  const [isOpen, setIsOpen] = useState(false)
  const [language] = useLanguage()
  const message = messages[language]

  const planList = planPeriod[currentPeriod] || []

  const marker = planList.map((item) => {
    return {
      lat: item.item.latitude,
      lng: item.item.longitude,
    }
  })

  const navigate = useNavigate()

  useEffect(() => {
    // 페이지를 벗어나기 전에 확인
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = message.confirm
      return message.confirm
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const onNext = () => {
    setIsOpen(true)
  }

  const onPrev = () => {
    navigate('/planner')
  }

  useEffect(() => {
    if (!plan.title) {
      navigate('/planner')
    }
  }, [plan.title, navigate])

  return (
    <Container>
      <LeftSection>
        <PlanLeftTab
          period={plan.period}
          onNext={onNext}
          onPrev={onPrev}
          prevText={message.prev}
          nextText={message.next}
        />
        <Places plan={plan} />
        <PlanOrder />
      </LeftSection>
      <RightSection>
        <GoogleMapLoad
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={{
            lat: plan.lat,
            lng: plan.lng,
          }}
          marker={marker}
        />
      </RightSection>
      <SelectTransportation isOpen={isOpen} onRequestClose={() => setIsOpen(false)} />
    </Container>
  )
}

export default PlanCreatePage

const Container = styled.div`
  display: flex;
`

const LeftSection = styled.div`
  display: flex;
  height: 100vh;
`

const RightSection = styled.div`
  flex: 2;
  height: 100vh;
`

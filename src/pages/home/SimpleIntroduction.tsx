import { styled } from 'styled-components'
import Button from './Button'

import logo from '../../assets/logo_noLetter.svg'
import { useNavigate } from 'react-router-dom'
import ServicePreview from './ServicePreview'
import useLanguage from 'hooks/useLanguage'

const messages = {
  'ko-KR': {
    title: '특별한 여행 경험',
    subtitle: '당신만의 여행 플랜을 만들고, 현지 가이드들과 함께 특별한 경험을 만들어 보세요!',
    createPlanBtn: '🚗 플랜 만들기',
  },
  'en-US': {
    title: 'Extraordinary Travel Experiences',
    subtitle: 'Create your own travel plans and create unique experiences with local guides!',
    createPlanBtn: '🚗 Create a plan',
  },
  'ja-JP': {
    title: '特別な旅行の経験',
    subtitle: 'あなたならではの旅行プランを作り、ローカルガイドさんたちと一緒に特別な思い出を作ってみましょう！',
    createPlanBtn: '🚗 プラン作成',
  },
}

const SimpleIntroduction = () => {
  const navigate = useNavigate()
  const [language] = useLanguage()
  const message = messages[language]

  return (
    <Container>
      <ContentSection>
        <div>
          <img src={logo} alt="logo" style={{ width: '64px', height: '64px', marginBottom: '1.25rem' }} />
          <Title>{message.title}</Title>
        </div>
        <Subtitle>{message.subtitle}</Subtitle>

        <div style={{ marginBottom: '3.2rem' }}></div>

        <ButtonGroup>
          <Button size="large" onClick={() => navigate('/planner')}>
            {message.createPlanBtn}
          </Button>
        </ButtonGroup>
      </ContentSection>

      <ServicePreview />
    </Container>
  )
}

const Container = styled.div`
  flex-grow: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding: 4rem 1rem;
  }

  font-family: 'Noto Sans KR', sans-serif;
`

const ContentSection = styled.div`
  text-align: center;
  max-width: 600px;
  margin-bottom: 3rem;
  padding-right: 0;

  @media (min-width: 1024px) {
    text-align: left;
    margin-bottom: 0;
    padding-right: 3rem;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;

  @media (min-width: 1024px) {
    font-size: 2.2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`

const ImageSection = styled.div`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 16 / 9;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`

export default SimpleIntroduction

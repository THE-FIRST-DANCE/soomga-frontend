import { useEffect } from 'react'
import useLanguage from './useLanguage'

const messages = {
  'ko-KR': {
    title: '숨은 가이드 - 특별한 여행 경험',
    description:
      '숨은 가이드와 함께 특별한 여행을 경험하세요. 현지 가이드와 맞춤형 여행 계획을 만들고 독특한 여행지를 발견하세요.',
    keywords: '여행, 가이드, 여행 계획, 현지 경험, 숨은 명소, 맞춤형 여행',
    author: 'THE FIRST DANCE',
    ogTitle: '숨은 가이드 - 특별한 여행 경험',
    ogDescription: '현지 가이드와 함께하는 맞춤형 여행으로 특별한 경험을 만드세요.',
  },
  'en-US': {
    title: 'Soomga - Special Travel Experience',
    description:
      'Experience special travel with Soomga. Create customized travel plans with local guides and discover unique destinations.',
    keywords: 'travel, guide, travel planning, local experience, hidden spots, customized travel',
    author: 'THE FIRST DANCE',
    ogTitle: 'Soomga - Special Travel Experience',
    ogDescription: 'Create special experiences with customized travel with local guides.',
  },
  'ja-JP': {
    title: 'Soomga - 特別な旅行体験',
    description:
      'Soomgaと一緒に特別な旅行を体験しましょう。現地ガイドとカスタマイズされた旅行プランを作成し、ユニークな目的地を発見しましょう。',
    keywords: '旅行, ガイド, 旅行計画, 現地体験, 隠れスポット, カスタマイズ旅行',
    author: 'THE FIRST DANCE',
    ogTitle: 'Soomga - 特別な旅行体験',
    ogDescription: '現地ガイドと一緒にカスタマイズされた旅行で特別な体験を作りましょう。',
  },
}

export default function useMetadata() {
  const [language] = useLanguage()
  const message = messages[language]

  useEffect(() => {
    document.title = message.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', message.description)
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', message.keywords)
    document.querySelector('meta[name="author"]')?.setAttribute('content', message.author)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', message.ogTitle)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', message.ogDescription)
  }, [language])

  return {
    title: message.title,
    description: message.description,
    keywords: message.keywords,
    author: message.author,
    ogTitle: message.ogTitle,
    ogDescription: message.ogDescription,
  }
}

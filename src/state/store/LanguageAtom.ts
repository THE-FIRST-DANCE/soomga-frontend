import { atom } from 'recoil'

const getInitialLanguage = () => {
  const storedLanguage = localStorage.getItem('language')
  const supportedLanguages = ['ko-KR', 'en-US', 'ja-JP']
  const language = storedLanguage || navigator.language
  return supportedLanguages.includes(language) ? language : 'en-US'
}

export const LanguageAtom = atom<string>({
  key: 'LanguageAtom',
  default: getInitialLanguage(),
})

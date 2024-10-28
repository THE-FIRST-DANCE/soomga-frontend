import { atom } from 'recoil'

const getInitialLanguage = () => {
  const storedLanguage = localStorage.getItem('language')
  return storedLanguage ? storedLanguage : navigator.language || 'ko'
}

export const LanguageAtom = atom<string>({
  key: 'LanguageAtom',
  default: getInitialLanguage(),
})

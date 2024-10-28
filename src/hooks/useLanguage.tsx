import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { LanguageAtom } from 'state/store/LanguageAtom'

const useLanguage = () => {
  const [language, setLanguage] = useRecoilState(LanguageAtom)

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return [language, setLanguage] as const
}

export default useLanguage

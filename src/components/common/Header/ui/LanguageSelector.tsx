import React from 'react'
import { motion } from 'framer-motion'
import useLanguage from 'hooks/useLanguage'
import { styled } from 'styled-components'

const messages = {
  'ko-KR': {
    short: 'KO',
    main: '한국어',
  },
  'en-US': {
    short: 'EN',
    main: 'English',
  },
  'ja-JP': {
    short: 'JP',
    main: '日本語',
  },
}

interface LanguageSelectorProps {
  isLangOpen: boolean
}
const LanguageSelector = ({ isLangOpen }: LanguageSelectorProps) => {
  const [language, setLanguage] = useLanguage()
  const message = messages[language]

  const handleLangClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedLang = e.currentTarget.dataset.lang
    setLanguage(selectedLang!)
  }

  return (
    <LanguageDropdown_ul>
      {isLangOpen ? (
        /* //! 여기를 감싸야 한다 */
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            backgroundColor: 'white',
            padding: '0.75rem',
            borderRadius: '10px',
            boxShadow: '1px 1px 16px 2px lightgray',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            zIndex: 100,
          }}
        >
          <li onClick={handleLangClick} data-lang="ko-KR">
            {messages['ko-KR'].main}
          </li>
          <li onClick={handleLangClick} data-lang="en-US">
            {messages['en-US'].main}
          </li>
          <li onClick={handleLangClick} data-lang="ja-JP">
            {messages['ja-JP'].main}
          </li>
        </motion.div>
      ) : (
        messages[language].short
      )}
    </LanguageDropdown_ul>
  )
}

// 3.1.2 우측 : 토글 [ KO | EN | JP ]
const LanguageDropdown_ul = styled.ul`
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  width: 50px;
  font-weight: 700;
  cursor: pointer;

  li {
    box-sizing: border-box;
    &:hover {
      color: var(--color-original);
    }
  }
`

export default LanguageSelector

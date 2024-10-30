import styled from 'styled-components'
import logo from 'assets/logo.svg'

import LanguageIcon from 'components/icons/LanguageIcon'
import HambergIcon from 'components/icons/HambergIcon'
import LoginIcon from 'components/icons/LoginIcon'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useClickOutsideToggle from 'hooks/useClickOutsideToggle'
import { motion } from 'framer-motion'
import { getCookie, getRemoveCookie } from 'utils/cookie'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import { AccessTokenAtom } from 'state/store/AccessTokenAtom'
import LanguageSelector from './LanguageSelector'
import useLanguage from 'hooks/useLanguage'

const messages = {
  'ko-KR': {
    guide: '가이드',
    schedule: '여행 일정',
    recommendations: '여행지 추천',
    plan: '플랜',
    userButton: {
      login: '로그인',
      signup: '회원가입',
      mypage: '마이페이지',
      logout: '로그아웃',
    },
    logout: '정상적으로 로그아웃 되었습니다',
  },
  'en-US': {
    guide: 'Guide',
    schedule: 'Travel Schedule',
    recommendations: 'Travel Recommendations',
    plan: 'Plan',
    userButton: {
      login: 'Login',
      signup: 'Sign Up',
      mypage: 'My Page',
      logout: 'Logout',
    },
    logout: 'Successfully logged out',
  },
  'ja-JP': {
    guide: 'ガイド',
    schedule: '旅行スケジュール',
    recommendations: 'おすすめスポット',
    plan: 'プラン',
    userButton: {
      login: 'ログイン',
      signup: '会員登録',
      mypage: 'マイページ',
      logout: 'ログアウト',
    },
    logout: 'ログアウトしました',
  },
}

interface IconWrapperProps {
  flex: number
}

/* 🟢 HEADER */
const Header = () => {
  const navigate = useNavigate()
  const [language] = useLanguage()
  const message = messages[language]
  const [recoilToken, setRecoilToken] = useRecoilState(AccessTokenAtom)

  // 언어 변경 : 커스텀훅_useClickOutsideToggle
  const {
    isOpen: isLangOpen,
    refForToggle: refForLangToggle,
    handleOnClick: handleLangOnClick,
  } = useClickOutsideToggle()

  // 로그인 : 커스텀훅_useClickOutsideToggle
  const {
    isOpen: isLoginOpen,
    refForToggle: refForLoginToggle,
    handleOnClick: handleLoginOnClick,
  } = useClickOutsideToggle()

  return (
    <HeaderLayout_div>
      {/* 1. 좌측 : 로고 */}
      <HeaderLeftWrapper_div>
        <img
          src={logo}
          alt="HeaderLogo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        />
      </HeaderLeftWrapper_div>

      {/* 2. 중앙 : 버튼 Container*/}
      <HeaderMiddleContainer_div>
        {/* 2.1 버튼 (가이드 | 여행일정 | 여행지 추천 | 플랜 | 채팅) */}
        {/* FIXME: (전시회) 가이드를 보여주지 않음. */}
        <HeaderMiddleBtn onClick={() => navigate('/guides')}>{message.guide}</HeaderMiddleBtn>
        <HeaderMiddleBtn onClick={() => navigate('/schedule')}>{message.schedule}</HeaderMiddleBtn>
        <HeaderMiddleBtn onClick={() => navigate('/recommendations')}>{message.recommendations}</HeaderMiddleBtn>
        <HeaderMiddleBtn onClick={() => navigate('/planner')}>{message.plan}</HeaderMiddleBtn>
      </HeaderMiddleContainer_div>

      {/* 3. 우측 : 언어 | 버거 + 사용자 아이콘 */}
      <HeaderRightContainer_div>
        {/* 3.1 우측 : 언어 선택 버튼 */}
        <motion.div whileHover={{ scale: 1.2, zIndex: 100 }}>
          <HeaderIconContainer_div
            flex={0.3}
            ref={refForLangToggle}
            onClick={(e) => {
              e.preventDefault()
              handleLangOnClick()
            }}
          >
            {/* 3.1.1 지구본 아이콘 */}

            <StyledLanguageIcon height="2rem" width="2rem " />

            {/* 3.1.2 우측 : 토글  [ KO | EN | JP ]*/}
            <LanguageSelector isLangOpen={isLangOpen} />
          </HeaderIconContainer_div>
        </motion.div>

        {/* 3.2 우측 로그인 버튼 */}
        <HeaderIconContainer_div
          flex={0.7}
          style={{ flexWrap: 'wrap' }}
          ref={refForLoginToggle}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation() // 클릭 이벤트의 전파를 막음
            handleLoginOnClick()
          }}
        >
          {/* 3.2.1 로그인 아이콘 (햄버거 + 사람) */}
          <div
            style={{
              width: '100px',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              border: '3px solid lightgray',
              backgroundColor: 'white',
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <HambergIcon height="40px" width="40px" />
            <LoginIcon height="40px" width="40px" />
          </div>
          {/* 3.2.2 우측 :토글 [ 회원가입 | 로그인 ]  */}
          {isLoginOpen ? (
            <LoginDropdown_div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              {/* 3.2.2.1  우측 : 유저 버튼  */}

              {!getCookie('accessToken') ? (
                <>
                  <UseTab_btn
                    onClick={() => {
                      navigate('/user/login')
                    }}
                  >
                    {message.userButton.login}
                  </UseTab_btn>
                  <UseTab_btn
                    onClick={() => {
                      navigate('/user/signup')
                    }}
                  >
                    {message.userButton.signup}
                  </UseTab_btn>
                </>
              ) : (
                <>
                  <UseTab_btn
                    onClick={() => {
                      navigate('/mypage/info')
                    }}
                  >
                    {message.userButton.mypage}
                  </UseTab_btn>
                  <UseTab_btn
                    onClick={() => {
                      getRemoveCookie('accessToken')
                      // setRecoilToken({ token: false })
                      setRecoilToken((prev) => ({ ...prev, token: false }))

                      localStorage.setItem('userInfo', JSON.stringify({}))
                      toast.success(message.logout)
                      navigate('/')
                    }}
                  >
                    {message.userButton.logout}
                  </UseTab_btn>
                </>
              )}
            </LoginDropdown_div>
          ) : null}
        </HeaderIconContainer_div>
      </HeaderRightContainer_div>
    </HeaderLayout_div>
  )
}

/* ----------------------------- 💅 StyledComponent -----------------------------*/

// 전체 Layout div
const HeaderLayout_div = styled.div`
  position: fixed;
  display: flex;
  min-width: 1200px;
  /* min-width: 70%; */
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.175);
  backdrop-filter: blur(5px) !important;
  border-radius: 10px;

  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;

  z-index: 5;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
`

/* 左 */
//　1. 좌측 : 로고
const HeaderLeftWrapper_div = styled.div`
  width: 20%;
  height: 4rem;
  flex-grow: 1;
  // SOOMGA 로고 이미지
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    object-fit: cover; /* 필요에 따라 object-fit 속성을 조절할 수 있습니다 */
  }
`

/* 中 */
// 2. 중앙 : 버튼 Container
const HeaderMiddleContainer_div = styled.div`
  width: 60%;
  display: flex;
  flex-grow: 2;
  gap: 1.5rem;
  padding-left: 50px;
  box-sizing: border-box;
  align-items: center;
`

// 2.1 중앙 : 버튼 (가이드 | 여행일정 | 여행지 추천 | 플랜 | 채팅)
const HeaderMiddleBtn = styled.button<{ value?: string }>`
  width: auto;
  padding: 0 20px;
  height: 100%;
  font-size: 1.3rem;
  font-weight: 700;
  background-color: transparent;
  border: none;
  cursor: pointer;
  /* z-index: 3; */
  &:hover {
    color: var(--color-original);
  }
`

/* 右 */
// 3. 우측 : 언어 | 버거 + 사용자 아이콘
const HeaderRightContainer_div = styled.div`
  position: relative;
  display: flex;
  width: 230px;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
`

// 3.1 우측 : 언어 선택 버튼
const HeaderIconContainer_div = styled.div<IconWrapperProps>`
  display: flex;
  flex: ${(props) => props.flex};
  justify-content: center;
  align-items: center;
  /* margin-right: 30px; */
`
const StyledLanguageIcon = styled(motion(LanguageIcon))`
  :hover {
    color: var(--color-original);
  }
`

// 3.2.2 우측 :토글 [ 회원가입 | 로그인 ]
const LoginDropdown_div = styled(motion.div)`
  width: 200px;
  height: auto;
  position: absolute;
  top: 100%;
  right: 5px;
  border: 1px solid lightgray;
  border-radius: 20px;
  box-shadow: 1px 1px 16px 2px lightgray;
  background-color: #ffffff;
`

// 3.2.2.1 우측 : 유저 버튼
const UseTab_btn = styled(HeaderMiddleBtn)`
  min-height: 75px;
  width: 100%;
  border-radius: 20px;
  color: #403f3f;
  &:hover {
    background-color: #edeaea;
  }
`

export default Header

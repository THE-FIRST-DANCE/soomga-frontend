import styled from 'styled-components'
import logo from '../../assets/logo.svg'

import LanguageIcon from 'components/icons/LanguageIcon'
import HambergIcon from 'components/icons/HambergIcon'
import LoginIcon from 'components/icons/LoginIcon'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface IconWrapperProps {
  flex: number
}

/* 🟢 HEADER */
const Header = () => {
  const navigate = useNavigate()

  const [nowLang, setnowLang] = useState<string>('KO') // 현재 언어 상태

  const [isLangDropOpen, setIsLangDropOpen] = useState<Boolean>(false) // 언어 드랍다운 상태

  const [isLoginDropOpen, setIsLoginDropOpen] = useState<Boolean>(false) // 로그인 드랍다운 상태

  // 드롭다운 상태 변경
  const toggleDrop = () => {
    setIsLangDropOpen(!isLangDropOpen)
  }

  console.log(isLangDropOpen)

  // 언어 클릭시 다른 언어로 변경
  const handleLangClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement
    const selectedLang = target.dataset.lang
    setnowLang(selectedLang!)
  }

  /* 언어 드롭다운 이벤트 : 클릭후 다른 곳 클릭시 드롭다운 사라짐 */
  // = isLangDropOpen 값에 따른 이벤트 함수
  useEffect(() => {
    /*  클릭 이벤트를 처리 : 드랍다운 메뉴 외부를 클릭했는지 확인*/
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.querySelector('#languageDropdown') //드롭다운을 나타내는 DOM  : 언어를 클릭하면 drop다운 값 저장

      // FIXME:  ref
      /*  클릭된 요소(e.target)가 드랍다운 메뉴 외부에 있는지를 확인 : e.target이 dropdown 요소의 자식인지를 확인 */
      if (!dropdown?.contains(e.target as Node)) {
        // && 조건으로 해보기
        setIsLangDropOpen(false) // 외부를 눌렀을 때 드랍다운 제거
      }
    }

    // 이벤트 리스너 등록
    if (isLangDropOpen) {
      window.addEventListener('click', handleClickOutside)
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isLangDropOpen, isLoginDropOpen])

  return (
    <HeaderLayout_div>
      {/* 1. 좌측 : 로고 */}
      <HeaderLeftWrapper_div>
        <img src={logo} alt="Logo" />
      </HeaderLeftWrapper_div>

      {/* 2. 중앙 : 버튼*/}
      <HeaderMiddleContainer_div>
        <HeaderMiddleBtn onClick={() => navigate('/guides')}>가이드</HeaderMiddleBtn>
        <HeaderMiddleBtn onClick={() => navigate('/itinerary')}>여행 일정</HeaderMiddleBtn>
        <HeaderMiddleBtn onClick={() => navigate('/recommendations')}>여행지 추천</HeaderMiddleBtn>
        <HeaderMiddleBtn onClick={() => navigate('/planner')}>플랜</HeaderMiddleBtn>
        <HeaderMiddleBtn onClick={() => navigate('/chatting')}>채팅</HeaderMiddleBtn>
      </HeaderMiddleContainer_div>

      {/* 3. 우측 : 언어 | 햄버거 | 사용자 아이콘 */}
      <HeaderRightContainer_div onClick={toggleDrop}>
        {/* 3.1  언어 선택 버튼*/}
        <HeaderIconContainer_div flex={0.3}>
          {' '}
          {/* FIXME:여기에 Ref를 써라 , 이걸 클릭하면  */}
          <LanguageIcon height="40px" width="40px" />
          <LanguageDropdown_ul id="languageDropdown">
            {isLangDropOpen ? (
              <>
                <li onClick={handleLangClick} data-lang="KO">
                  KO
                </li>
                <li onClick={handleLangClick} data-lang="EN">
                  EN
                </li>
                <li onClick={handleLangClick} data-lang="JP">
                  JP
                </li>
              </>
            ) : (
              nowLang
            )}
          </LanguageDropdown_ul>
        </HeaderIconContainer_div>

        {/* 3.2 우측 로그인 버튼 */}
        <HeaderIconContainer_div
          flex={0.7}
          style={{ flexWrap: 'wrap' }}
          onClick={() => setIsLoginDropOpen((prev) => !prev)}
        >
          <div
            style={{
              width: '100px',
              padding: '15px',
              borderRadius: '50px',
              border: '3px solid black',
              backgroundColor: 'white',
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <HambergIcon height="40px" width="40px" />
            <LoginIcon height="40px" width="40px" />
            {/* <LoginModal_div></LoginModal_div> */}
          </div>
          {isLoginDropOpen ? (
            <LoginModal_div>
              <UseTab_btn>회원가입</UseTab_btn>
              <UseTab_btn>로그인</UseTab_btn>
            </LoginModal_div>
          ) : null}
        </HeaderIconContainer_div>
      </HeaderRightContainer_div>
    </HeaderLayout_div>
  )
}

/* 상단 NavBar */

// 전체 Wrapper div
const HeaderLayout_div = styled.div`
  position: fixed;
  display: flex;
  min-width: 1200px;
  /* min-width: 70%; */
  height: 102px;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  backdrop-filter: blur(3px) !important;
  border-radius: 10px;
`

// 이미지 Wrapper div : 좌측
const HeaderLeftWrapper_div = styled.div`
  /* width: 230px; */
  width: 20%;
  height: 102px;
  flex-grow: 1;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;

    object-fit: cover; /* 필요에 따라 object-fit 속성을 조절할 수 있습니다 */
  }
`

// 버튼 Wrapper div : 중앙
const HeaderMiddleContainer_div = styled.div`
  width: 60%;
  display: flex;
  flex-grow: 2;
  /* flex-grow: 2; */
  padding-left: 50px;
  box-sizing: border-box;
  align-items: center;
`

// 각각의 버튼들 (가이드 | 여행일정 | 여행지 추천 | 플랜 | 채팅) : 중앙
const HeaderMiddleBtn = styled.button<{ value?: string }>`
  width: auto;
  padding: 0 20px;
  height: 100%;
  font-size: 25px;
  font-family: 700;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

// 우측 아이콘 (언어 | 로그인) Wrapper div : 우측
const HeaderRightContainer_div = styled.div`
  width: 20%;
  /* background-color: red; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LanguageDropdown_ul = styled.ul`
  padding: 0 10px;
  box-sizing: border-box;
  width: 50px;
  cursor: pointer;
`

const LoginModal_div = styled.div`
  width: 200px;
  height: 150px;
  position: absolute;
  top: 90px;
  right: 5px;
  border: 1px solid lightgray;
  border-radius: 20px;
  box-shadow: 1px 1px 16px 2px lightgray;
`

const HeaderIconContainer_div = styled.div<IconWrapperProps>`
  display: flex;
  flex: ${(props) => props.flex};
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`

const UseTab_btn = styled(HeaderMiddleBtn)`
  height: 50%;
  width: 100%;
  border-radius: 20px;

  &:hover {
    background-color: #edeaea;
  }
`

export default Header

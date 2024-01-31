import styled from 'styled-components'
import logo from '../../assets/logo.svg'

import LanguageIcon from 'components/icons/LanguageIcon'
import HambergIcon from 'components/icons/HambergIcon'
import LoginIcon from 'components/icons/LoginIcon'
import { useNavigate } from 'react-router-dom'

/* 상단 NavBar */

// 전체 Wrapper div
const HeaderLayout_div = styled.div`
  position: fixed;
  display: flex;
  min-width: 1200px;
  /* min-width: 70%; */
  height: 102;
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
    padding:;
    object-fit: cover; /* 필요에 따라 object-fit 속성을 조절할 수 있습니다 */
  }
`

// 버튼 Wrapper div : 중앙
const HeaderMiddleContainer_div = styled.div`
  width: 60%;
  display: flex;

  flex-grow: 2;
  justify-content: center;
  align-items: center;
  /* height: 102px; */
`

// 각각의 버튼들 (가이드 | 여행일정 | 여행지 추천 | 플랜 | 채팅) : 중앙
const HeaderMiddleBtn = styled.button<{ value?: string }>`
  width: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;
`

interface IconWrapperProps {
  flex: number
}

const HeaderIconContainer_div = styled.div<IconWrapperProps>`
  flex: ${(props) => props.flex};
  justify-content: center;
  align-items: center;
  gap: 20px;
`

// 버튼 : 중앙
const Header = () => {
  const navigate = useNavigate()
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
      <HeaderRightContainer_div>
        <HeaderIconContainer_div flex={0.3}>
          <LanguageIcon height="40px" width="40px" />
        </HeaderIconContainer_div>
        <HeaderIconContainer_div flex={0.7}>
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
          </div>
        </HeaderIconContainer_div>
      </HeaderRightContainer_div>
    </HeaderLayout_div>
  )
}

export default Header

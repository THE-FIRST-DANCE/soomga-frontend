import loginLogo from 'assets/loginLogo.png'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import {
  LoginBtn,
  SignupBtn,
  LeftSection,
  ImageWrapper,
  RightSection,
  RightSectionInner,
  RightTitle,
  Login_SingupContainer,
} from './UserForm.login.style'

const UserForm = ({ children }: React.PropsWithChildren<{}>) => {
  let { id } = useParams()
  const navigate = useNavigate()

  return (
    <LoginPageLayout>
      {/* 로그인 페이지 컨테이너 */}
      <LoginContainer>
        {/* 🟡 좌측 */}
        {/* 1 좌측 섹션 */}
        <LeftSection>
          {/* 1.1 로고 이미지 : img */}
          <ImageWrapper>
            <img src={loginLogo} alt="" />
          </ImageWrapper>
        </LeftSection>

        {/* 🟡 우측 */}
        {/* 2 우측 섹션 */}
        <RightSection>
          {/* 2.1 우측 색션 Inner : 중앙 정렬 */}
          <RightSectionInner>
            {/* 2.1.1 우측 타이틀  */}
            <RightTitle>
              <span className="gray">안녕, </span>
              <span className="red">함께 떠나자!</span> ✈️
            </RightTitle>

            {/* 2.1.2 우측 login & signup 컨테이너  */}
            <Login_SingupContainer>
              {/* 2.1.2.1 로그인 버튼 */}
              <LoginBtn
                loginOrSignup={id}
                onClick={() => {
                  navigate('/user/login')
                }}
              >
                Login
              </LoginBtn>
              {/* 2.1.2.2 회원가압 버튼 */}
              <SignupBtn
                loginOrSignup={id}
                onClick={() => {
                  navigate('/user/signup')
                }}
              >
                SignUp
              </SignupBtn>
            </Login_SingupContainer>

            {/* 여기에  추가 */}
            {children}
          </RightSectionInner>
        </RightSection>
      </LoginContainer>
    </LoginPageLayout>
  )
}

export default UserForm

/* ----------------------------- 💅 StyledComponent -----------------------------*/

export const LoginPageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 1320px;
  /* height: 100vh; */
  margin-top: 0px;
  /* background-color: #8e8ef2; */
`

/*  로그인 페이지 컨테이너  */
export const LoginContainer = styled.div`
  width: 1100px;
  height: auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  /* background-color: #a4f876; */
`

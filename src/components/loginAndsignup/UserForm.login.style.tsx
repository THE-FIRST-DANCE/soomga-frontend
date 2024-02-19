import styled from 'styled-components'

type ToggleBtnProps = {
  loginOrSignup?: string
}

/* 🟡  좌측 */
// 1 좌측 섹션
export const LeftSection = styled.div`
  width: 60%;
  height: 100%; // 여기를 명시적으로 나타내지 않으니, 자식 요소가 범위를 벗어나버리더라
  overflow: hidden;
  border-radius: 20px;
  /* background-color: #d4ff14; */
`
// 1.1 로고 이미지 : img
export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
  }
`

/* 🟡 우측 */
// 2 우측 섹션
export const RightSection = styled.div`
  width: 50%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
`

// 2.1 우측 색션 Inner : 중앙 정렬
export const RightSectionInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
// 2.1.1 우측 타이틀
export const RightTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;

  margin: 2rem 0;
  & > span.gray {
    color: var(--bs-gray-500);
  }

  & > span.red {
    color: var(--color-original);
  }
`
// 2.1.2 우측 login & signup 컨테이너
export const Login_SingupContainer = styled.div`
  width: 50%;
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  margin-bottom: 2rem;
`

// 버튼
export const ToggleBtn = styled.div<ToggleBtnProps>`
  width: 48%;
  height: 3rem;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
`

// 2.1.2.1 로그인 버튼
export const LoginBtn = styled(ToggleBtn)`
  color: ${({ loginOrSignup }: { loginOrSignup?: string }) =>
    loginOrSignup === 'login' ? 'var(--color-original)' : 'var( --bs-gray-original)'};

  border-bottom: ${({ loginOrSignup }: { loginOrSignup?: string }) =>
    loginOrSignup === 'login' ? '3px solid var(--color-original);' : 'null'};
`
// 2.1.2.2 회원가압 버튼
export const SignupBtn = styled(ToggleBtn)`
  color: ${({ loginOrSignup }: { loginOrSignup?: string }) =>
    loginOrSignup === 'signup' ? 'var(--color-original)' : 'var( --bs-gray-original)'};

  border-bottom: ${({ loginOrSignup }: { loginOrSignup?: string }) =>
    loginOrSignup === 'signup' ? '3px solid var(--color-original);' : 'null'};
`

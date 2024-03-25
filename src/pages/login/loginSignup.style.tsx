import styled from 'styled-components'

/* 🟡 로그인 페이지 */

/* 🟡 1. Form */
export const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  /* background-color: orange; */
`

// 1.1 Input태그  : EmailInput + PasswordInput
export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`

export const Inputwrap = styled.div`
  height: 50px;
  margin-bottom: 60px;

  p {
    margin-top: 20px;
    font-size: 20px;
    color: var(--color-original);
  }
`

export const Input = styled.input`
  width: 350px;
  height: 40px;
  padding: 0.5em;
  box-sizing: border-box;
  /* margin-bottom: 50px; */
  font-size: 25px;
  outline: none;
  border: 0;
  border-bottom: 3px solid var(--bs-gray-200);
  &::placeholder {
    color: var(--bs-gray-original);
  }
`

export const EmailInput = styled(Input)``
export const PasswordInput = styled(Input)``

/* 1.2 로그인 버튼*/
export const LoginBtn = styled.button`
  width: 350px;
  height: 50px;
  padding: 0.5em;
  margin-bottom: 4rem;
  background-color: var(--color-original);
  color: white;
  font-size: 20px;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background-color: var(--color-original); /* 변경된 부분 */
    transform: translateY(-3px) translateX(-3px);
    box-shadow: 5px 5px 5px var(--color-original);
  }
`
export const NoLoginBtn = styled(LoginBtn)`
  pointer-events: none;
`

/* 🟡 3. OAuth */
export const OAuthContainer = styled.div`
  width: 30%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: violet; */
`

// 3.1 OAuth 래퍼 : LetterOr + GoogleIcon + LineIcon
export const OAuthWrapper = styled.div`
  width: 350px;
  height: 50px;
  position: relative;
  border: 1px solid var(--bs-gray-200);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`
export const LetterOr = styled.div`
  width: 30px;
  position: absolute;
  text-align: center;
  top: 1px;
  background-color: #fff;
  left: 50%;
  color: var(--bs-gray-500);
  transform: translate(-50%, -50%);
  font-size: 15px;
  font-weight: bold;
`

/* 🟡 회원가입 페이지 */

/* 🟡 1. Form */

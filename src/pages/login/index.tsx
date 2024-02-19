import styled from 'styled-components'
import GoogleIcon from 'components/icons/GoogleIcon'
import LineIcon from 'components/icons/LineIcon'
import UserForm from 'components/loginAndsignup/UserForm'
import { useParams } from 'react-router-dom'
import { validationLoginSchema, validationSignupSchema } from 'utils/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormWrapper,
  InputWrapper,
  EmailInput,
  PasswordInput,
  LoginBtn,
  NoLoginBtn,
  OAuthContainer,
  OAuthWrapper,
  LetterOr,
  Inputwrap,
} from './loginSignup.style'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface LoginForm {
  email: string
  password: string
}
interface SignuppForm {
  email: string
  nickName: string
  repassword: string
  password: string
}

const LoginSignupPage = () => {
  const [password, setPassword] = useState<string>('')
  const [checkPassword, setCheckPassword] = useState<string>('')

  // 로그인 유효성 검사 스키마 :
  const loginForm = useForm<LoginForm>({
    mode: 'onChange',
    resolver: zodResolver(validationLoginSchema),
  })

  // 회원가입 유효성 검사 스키마 :
  const signupForm = useForm<SignuppForm>({
    mode: 'onChange',
    resolver: zodResolver(validationSignupSchema),
  })

  // FIXME:Post 요청할 때 보내기
  const onSubmitForLogin = (data: LoginForm) => {
    console.log(data)
  }
  const onSubmitForSignup = (data: SignuppForm) => {
    console.log(data)
  }

  let { id } = useParams()
  return id === 'login' ? (
    /* 로그인 페이지 */
    <UserForm>
      <Inner>
        {/* 🟡 1. Form  */}
        <FormWrapper>
          <form onSubmit={loginForm.handleSubmit(onSubmitForLogin)}>
            {/* 1.1 Input태그  : EmailInput + PasswordInput  */}
            <InputWrapper>
              <Inputwrap>
                <EmailInput
                  {...loginForm.register('email')} // ()안에 넣는 문자가 handleSubmit 함수안의 함수의 인자에서 출력해 사용할 수 있다.
                  type="email"
                  placeholder="Email을 입력하세요..."
                />
                <p>{loginForm.formState.errors.email?.message as React.ReactNode}</p>
              </Inputwrap>
              <Inputwrap>
                <PasswordInput
                  {...loginForm.register('password')}
                  type="password"
                  placeholder="Password를 입력하세요..."
                />
                <p>{loginForm.formState.errors.password?.message as React.ReactNode}</p>
              </Inputwrap>
            </InputWrapper>

            {/* 1.2 로그인 버튼 */}
            <LoginBtn>Log in</LoginBtn>
          </form>
        </FormWrapper>

        {/* 🟡 3. OAuth */}
        <OAuthContainer>
          {/* 3.1 OAuth 래퍼 : LetterOr + GoogleIcon + LineIcon */}
          <OAuthWrapper>
            <LetterOr>Or</LetterOr>
            <GoogleIcon width="35" height="35" />
            <LineIcon width="35" height="35" />
          </OAuthWrapper>
        </OAuthContainer>
      </Inner>
    </UserForm>
  ) : (
    /* 회원가입 페이지 */
    <UserForm>
      <Inner>
        <FormWrapper>
          <form onSubmit={signupForm.handleSubmit(onSubmitForSignup)}>
            {/* 1.1 Input태그  : EmailInput + PasswordInput  */}
            <InputWrapper>
              <Inputwrap>
                <EmailInput
                  {...signupForm.register('email')} // ()안에 넣는 문자가 handleSubmit 함수안의 함수의 인자에서 출력해 사용할 수 있다.
                  type="email"
                  placeholder="Email을 입력하세요..."
                />
                <p>{signupForm.formState.errors.email?.message as React.ReactNode}</p>
              </Inputwrap>
              <Inputwrap>
                <PasswordInput
                  {...signupForm.register('nickName')}
                  type="text"
                  placeholder="Nickname를 입력하세요..."
                />
                <p>{signupForm.formState.errors.nickName?.message as React.ReactNode}</p>
              </Inputwrap>
              <Inputwrap>
                <PasswordInput
                  {...signupForm.register('password')}
                  type="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                  }}
                  placeholder="Password를 입력하세요..."
                />
                <p>{signupForm.formState.errors.password?.message as React.ReactNode}</p>
              </Inputwrap>
              <Inputwrap>
                <PasswordInput
                  {...signupForm.register('repassword')}
                  type="password"
                  placeholder="다시 Password를 입력하세요..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCheckPassword(e.target.value)
                  }}
                />
                <p>{signupForm.formState.errors.repassword?.message as React.ReactNode}</p>

                {/* 비밀번호가 일치하지 않을 시  */}
                {password !== checkPassword && (
                  <p style={{ color: 'var(--color-original)' }}>* Password가 일치하지 않습니다! </p>
                )}
              </Inputwrap>
            </InputWrapper>

            {/* 1.2 로그인 버튼 */}
            {password !== checkPassword ? <NoLoginBtn>Sign up</NoLoginBtn> : <LoginBtn>Sign up</LoginBtn>}
          </form>
        </FormWrapper>
      </Inner>
    </UserForm>
  )
}

export default LoginSignupPage

/* COMMON */
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`

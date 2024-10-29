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
import { useEffect, useState } from 'react'

import { getLogin, getSignup, getUserInfo } from 'api/LoginSignUp'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getCookie } from 'utils/cookie'
import { useRecoilState } from 'recoil'
import { AccessTokenAtom } from 'state/store/AccessTokenAtom'
import { onGoogleLogin, onLineLogin } from 'utils/oauth.connector'
import useLanguage from 'hooks/useLanguage'

const messages = {
  'ko-KR': {
    title: '로그인',
    email: '이메일',
    password: '비밀번호',
    login: '로그인하기',
    signup: '회원가입',
    forgotPassword: '비밀번호 찾기',
    or: '또는',
    kakaoLogin: '카카오로 로그인',
    naverLogin: '네이버로 로그인',
    googleLogin: '구글로 로그인',
    emailPlaceholder: '이메일을 입력해주세요',
    passwordPlaceholder: '비밀번호를 입력해주세요',
    nicknamePlaceholder: '닉네임을 입력해주세요',
    loginError: '로그인에 실패했습니다',
    emailRequired: '이메일을 입력해주세요',
    passwordRequired: '비밀번호를 입력해주세요',
    invalidEmail: '올바른 이메일 형식이 아닙니다',
    greeting: '안녕, 함께 떠나자! ✈️',
  },
  'en-US': {
    title: 'Login',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    signup: 'Sign Up',
    forgotPassword: 'Forgot Password',
    or: 'OR',
    kakaoLogin: 'Login with Kakao',
    naverLogin: 'Login with Naver',
    googleLogin: 'Login with Google',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    nicknamePlaceholder: 'Enter your nickname',
    loginError: 'Login failed',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    invalidEmail: 'Invalid email format',
    greeting: "Let's travel together! ✈️",
  },
  'ja-JP': {
    title: 'ログイン',
    email: 'メールアドレス',
    password: 'パスワード',
    login: 'ログイン',
    signup: '会員登録',
    forgotPassword: 'パスワードを忘れた方',
    or: 'または',
    kakaoLogin: 'カカオでログイン',
    naverLogin: 'ネイバーでログイン',
    googleLogin: 'Googleでログイン',
    emailPlaceholder: 'メールアドレスを入力してください',
    passwordPlaceholder: 'パスワードを入力してください',
    nicknamePlaceholder: 'ニックネームを入力してください',
    loginError: 'ログインに失敗しました',
    emailRequired: 'メールアドレスを入力してください',
    passwordRequired: 'パスワードを入力してください',
    invalidEmail: 'メールアドレスの形式が正しくありません',
    greeting: '一緒に旅に出かけよう！ ✈️',
  },
}

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
  const [errorMsg, setErrorMsg] = useState<string>('')
  const navigate = useNavigate()

  const [language] = useLanguage()
  const message = messages[language]

  // 현재 선택된 언어의 메시지

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

  /* 리코일 코드  */
  const [recoilToken, setRecoilToken] = useRecoilState(AccessTokenAtom)

  const fetchUserInfo = async () => {
    try {
      const userInfos = await getUserInfo()

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          id: userInfos.id,
          email: userInfos.email,
          nickname: userInfos.nickname,
          avatar: userInfos.avatar,
        }),
      )
    } catch (error) {
      console.error('유저 정보를 가져오는 중 에러가 발생했습니다.', error)
    }
  }

  const onSubmitForLogin = async (data: LoginForm) => {
    try {
      const loginResult = await getLogin(data.email, data.password)

      const token = await getCookie('accessToken')
      setRecoilToken({ ...recoilToken, token: !!token })

      fetchUserInfo()

      navigate('/')
      toast.success(message.login)

      return loginResult
    } catch (error: any) {
      console.error('Error during login:', error.response.data.message)
      setErrorMsg(error.response.data.message)
      toast.error(message.loginError)
    }
  }

  const onSubmitForSignup = async (data: SignuppForm) => {
    try {
      const result = await getSignup(data.email, data.nickName, data.password, data.password)
      window.location.replace('/')
      toast.success('회원가입에 성공했습니다!')
    } catch (error: any) {
      console.error('Error during login:', error)
    }
  }

  let { id } = useParams()

  return id === 'login' ? (
    /* 로그인 페이지 */
    <UserForm>
      <Inner>
        <FormWrapper>
          <form onSubmit={loginForm.handleSubmit(onSubmitForLogin)}>
            <InputWrapper>
              <Inputwrap>
                <EmailInput {...loginForm.register('email')} type="email" placeholder={message.emailPlaceholder} />
                <p>{loginForm.formState.errors.email?.message as React.ReactNode}</p>
              </Inputwrap>
              <Inputwrap>
                <PasswordInput
                  {...loginForm.register('password')}
                  type="password"
                  placeholder={message.passwordPlaceholder}
                />
                <p>{loginForm.formState.errors.password?.message as React.ReactNode}</p>
                {errorMsg && <p>{errorMsg}</p>}
              </Inputwrap>
            </InputWrapper>

            <LoginBtn>{message.login}</LoginBtn>
          </form>
        </FormWrapper>

        <OAuthContainer>
          <OAuthWrapper>
            <LetterOr>{message.or}</LetterOr>
            <GoogleIcon
              width="35"
              height="35"
              onClick={() => {
                onGoogleLogin('/')
                setRecoilToken({ ...recoilToken, token: true })
              }}
            />

            <LineIcon
              width="35"
              height="35"
              onClick={() => {
                onLineLogin('/')
                setRecoilToken({ ...recoilToken, token: true })
              }}
            />
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
            <InputWrapper>
              <Inputwrap>
                <EmailInput {...signupForm.register('email')} type="email" placeholder={message.emailPlaceholder} />
                <p>{signupForm.formState.errors.email?.message as React.ReactNode}</p>
              </Inputwrap>
              <Inputwrap>
                <PasswordInput
                  {...signupForm.register('nickName')}
                  type="text"
                  placeholder={message.nicknamePlaceholder}
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
                  placeholder={message.passwordPlaceholder}
                />
                <p>{signupForm.formState.errors.password?.message as React.ReactNode}</p>
              </Inputwrap>
              <Inputwrap>
                <PasswordInput
                  {...signupForm.register('repassword')}
                  type="password"
                  placeholder={message.passwordPlaceholder}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCheckPassword(e.target.value)
                  }}
                />
                <p>{signupForm.formState.errors.repassword?.message as React.ReactNode}</p>

                {password !== checkPassword && (
                  <p style={{ color: 'var(--color-original)' }}>* Password가 일치하지 않습니다! </p>
                )}
              </Inputwrap>
            </InputWrapper>

            {password !== checkPassword ? (
              <NoLoginBtn>{message.signup}</NoLoginBtn>
            ) : (
              <LoginBtn>{message.signup}</LoginBtn>
            )}
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
`

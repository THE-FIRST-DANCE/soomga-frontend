import axios from 'axios'
import { GLOBAL_CONFIG } from 'global.config'

export const baseApi = axios.create({
  baseURL: GLOBAL_CONFIG.VITE_APP_BASE_URL,
  withCredentials: true,

  // 왜 이부분을 추가하니 에러가 뜨지>??
  // headers: {
  //   'Cache-Control': 'no-cache',
  //   'Content-Type': 'application/json',
  //   // 'Access-Control-Allow-Origin': '*',
  // },
  responseType: 'json',
})

export const getLogin = async (email: string, password: string) => {
  const response = await baseApi.post('/auth/signin', {
    email,
    password,
  })
  return response.data
}
export const getSignup = async (email: string, nickname: string, password: string, passwordConfirm: string) => {
  const response = await baseApi.post('/auth/signup', {
    email,
    nickname,
    password,
    passwordConfirm,
  })
  return response.data
}
// export const getGoogleSignup = async () => {
//   const response = await baseApi.get('/auth/google')
//   return response.data
// }
// export const getLineSignup = async () => {
//   const response = await baseApi.post('/auth/line')
//   return response.data
// }

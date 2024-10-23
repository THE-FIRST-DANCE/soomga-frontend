import { baseApi } from 'baseApi'

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

export const getUserInfo = async () => {
  const response = await baseApi.get('/mypage')
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

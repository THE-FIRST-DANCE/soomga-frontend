import axios from 'axios'

export const baseApi = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

export const getLogin = async (email: string, password: string) => {
  const response = await baseApi.post('/auth/signin', {
    email,
    password,
  })

  return response.data
}

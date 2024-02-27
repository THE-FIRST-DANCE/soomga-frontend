import axios from 'axios'

export const baseApi = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  responseType: 'json',
})

export const getLogin = async (email: string, password: string) => {
  const response = await baseApi.post('/auth/signin', {
    email,
    password,
  })

  return response.data
}

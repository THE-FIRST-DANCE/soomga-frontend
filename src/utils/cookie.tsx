import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const getCookie = (name: string) => {
  return cookies.get(name)
}
export const getRemoveCookie = (name: string) => {
  return cookies.remove(name)
}

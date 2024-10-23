import axios from 'axios'
import { GLOBAL_CONFIG } from 'global.config'

export const baseApi = axios.create({
  baseURL: GLOBAL_CONFIG.VITE_APP_BASE_URL,
  withCredentials: true,
})

import axios from 'axios'
import { GLOBAL_CONFIG } from 'global.config'
import { GuideInfo, Pagination } from 'interfaces/guideInfo'

export const api = axios.create({
  baseURL: GLOBAL_CONFIG.VITE_APP_BASE_URL,
  withCredentials: true,
})

// export const getGuideList = async (): Promise<GuideInfo[]> => {
//   const response = await api.get('guides/search?sort=desc')
//   return response.data
// }

export const getGuideList = async ({ cursor, limit }: { cursor?: number; limit?: number }) => {
  const response = await api.get<Pagination<GuideInfo>>(`guides/search`)
  return response.data.items
}

export const getSelectedGuide = async (id: number) => {
  const response = await api.get(`guides/${id}`)
  return response.data
}

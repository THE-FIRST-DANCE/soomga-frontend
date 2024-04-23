import axios from 'axios'
import { GLOBAL_CONFIG } from 'global.config'
import { GuideProfile, Pagination } from 'interfaces/guideInfo'
import { RequestParamsType } from 'interfaces/requestParams'
import { SelecteddatasAtomType } from 'state/store/SelecteddatasAtom'

export const api = axios.create({
  baseURL: GLOBAL_CONFIG.VITE_APP_BASE_URL,
  withCredentials: true,
})

/*  🟡 1. 가이드 리스트 요청 🟡 */
export const getGuideList = async ({
  cursor,
  limit,
  requestParams,
}: {
  cursor?: number
  limit?: number
  requestParams: RequestParamsType
}) => {
  const { age, temperature, guideCount, gender, areas, languages, guideCeritifications, rating } = requestParams
  const response = await api.get<Pagination<GuideProfile>>(`guides/search/`, {
    params: {
      cursor,
      limit,
      age,
      temperature,
      guideCount,
      gender,
      areas,
      languages,
      guideCeritifications,
      rating,
    },
  })
  console.log('🟡🟡 response API 보낼 내용', response)

  return response.data
}

/*  3. 가이드 상세 */
export const getSelectedGuide = async (id: number) => {
  const response = await api.get(`guides/${id}`)
  return response.data
}

/* 4. 지역 정보 수집 */
export const getAreaDatas = async () => {
  const response = await api.get('areas')
  return response.data
}

import axios from 'axios'
import { GLOBAL_CONFIG } from 'global.config'
import { GuideProfile, Pagination } from 'interfaces/guideInfo'
import { RequestParamsType } from 'interfaces/requestParams'
import { SelecteddatasAtomType } from 'state/store/SelecteddatasAtom'

export const api = axios.create({
  baseURL: GLOBAL_CONFIG.VITE_APP_BASE_URL,
  withCredentials: true,
})

/* 1. 가이드 리스트 기본 */
export const getGuideList = async ({ cursor, limit }: { cursor?: number; limit?: number }) => {
  const response = await api.get<Pagination<GuideProfile>>(`guides/search`, {
    params: {
      cursor,
      limit,
    },
  })
  return response.data
}

/* 2. 조건 선택 가이드 리스트 */
export const getGuideListBySelected = async ({
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
  console.log(response)

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

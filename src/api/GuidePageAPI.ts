import { baseApi } from 'baseApi'
import { GuideProfile, Pagination } from 'interfaces/guideInfo'
import { RequestParamsType } from 'interfaces/requestParams'

export const getGuideCount = async ({ requestParams }: { requestParams: RequestParamsType }) => {
  const res = await baseApi.get<number>('/guides/count', { params: requestParams })
  return res.data
}

/*  🟡 1. 가이드 리스트 요청 🟡 */
export const getGuideList = async ({
  cursor,
  limit,
  requestParams,
}: {
  cursor?: number
  limit?: number
  requestParams?: RequestParamsType
}) => {
  const { age, temperature, guideCount, gender, areas, languages, guideCeritifications, rating } = requestParams
  const response = await baseApi.get<Pagination<GuideProfile>>(`guides/search/`, {
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
  // console.log('🟡🟡 response API 보낼 내용', response)

  return response.data
}

/*  3. 가이드 상세 */
export const getSelectedGuide = async (id: number) => {
  const response = await baseApi.get(`guides/${id}`)
  return response.data
}

/* 가이드 서비스 */
export const getGuideServices = async (id: number) => {
  const response = await baseApi.get(`guides/${id}/services`)
  return response.data
}

/* 4. 지역 정보 수집 */
export const getAreaDatas = async () => {
  const response = await baseApi.get('areas')
  return response.data
}

/* 5. 가이드 리뷰 댓글 */
export const getReviews = async (id: number) => {
  const response = await baseApi.get(`guides/${id}/reviews`)
  return response.data.items
}

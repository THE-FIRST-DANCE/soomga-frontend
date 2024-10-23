import axios from 'axios'
import { baseApi } from 'baseApi'
import { GooglePlaceResponse, PlaceData, PlanConfirmPeriodList, Plans } from 'interfaces/plan'
import { PeriodList } from 'state/store/PlanList'

export const getSearchPlaceGoogle = async ({
  query,
  location,
  pagetoken,
}: {
  query: string
  location: string
  pagetoken: string | null
}) => {
  const response = await baseApi.get('places/search', {
    params: {
      query,
      location,
      pagetoken,
    },
  })

  return response.data
}

export const addPlaceApi = async (data: PlaceData) => {
  const response = await baseApi.post('places/add', data)

  return response.data
}

export const getPlaceApi = async (category: string, region: string, cursor: number | null, search: string) => {
  const response = await baseApi.get('places', {
    params: {
      category,
      region,
      cursor,
      search,
    },
  })

  return response.data
}

export const getPlaceRoute = async ({ planList, transport }: PlanListConfirm) => {
  const data = {
    list: planList,
    transport,
  }

  const response = await baseApi.post('plans/distance', data)

  return response.data
}

interface PlanListConfirm {
  planList: PeriodList
  transport: string
}

export const getPlaceRouteEdit = async ({ planList, transport }: PlanListConfirm) => {
  const data = {
    list: planList,
    transport,
  }

  const response = await baseApi.post('plans/route/edit', data)

  return response.data
}

interface PlanSaveData {
  memberId: number
  planId: number | null
  title: string
  period: number
  region: string
  list: PlanConfirmPeriodList
  transport: string
}

export const savePlan = async (data: PlanSaveData) => {
  const response = await baseApi.post('plans/save', data)

  return response.data
}

export const getPlanList = async (authorId: number) => {
  const response = await baseApi.get('plans', {
    params: {
      authorId,
    },
  })

  return response.data
}

export const getTransCoord = async (x: number, y: number): Promise<{ x: number; y: number }> => {
  const response = await axios.get('https://dapi.kakao.com/v2/local/geo/transcoord.json', {
    params: {
      x: x,
      y: y,
      output_coord: 'WCONGNAMUL',
      input_coord: 'WGS84',
    },
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_CLIENT_ID}`,
    },
  })

  return {
    x: response.data.documents[0].x,
    y: response.data.documents[0].y,
  }
}

export const getPlanById = async (planId: number) => {
  const response = await baseApi.get(`plans/${planId}`)

  return response.data
}

export const getPlanByUserId = async (userId: number): Promise<Plans> => {
  const response = await baseApi.get(`plans/user/${userId}`)

  return response.data
}

export const deletePlan = async (planId: number) => {
  const response = await baseApi.delete(`plans/${planId}`)

  return response.data
}

export const getPlanComments = async (planId: number) => {
  const response = await baseApi.get(`plans/${planId}/comments`)

  return response.data
}

export const addPlanComment = async (planCommentDto: { planId: number; content: string; memberId: number }) => {
  const response = await baseApi.post('plans/comment', planCommentDto)

  return response.data
}

export const deletePlanComment = async (commentId: number) => {
  const response = await baseApi.delete(`plans/comment/${commentId}`)

  return response.data
}

import axios from 'axios'
import { GLOBAL_CONFIG } from 'global.config'
import { GooglePlaceResponse, PlaceData, Plans } from 'interfaces/plan'
import { PeriodList } from 'state/store/PlanList'

export const api = axios.create({
  baseURL: GLOBAL_CONFIG.VITE_APP_BASE_URL,
  withCredentials: true,
})

export const getSearchPlaceGoogle = async (query: string, location: string): Promise<GooglePlaceResponse> => {
  const response = await api.get('places/search', {
    params: {
      query,
      location,
    },
  })

  return response.data
}

export const addPlaceApi = async (data: PlaceData) => {
  const response = await api.post('places/add', data)

  return response.data
}

export const getPlaceApi = async (category: string, region: string) => {
  const response = await api.get('places', {
    params: {
      category,
      region,
    },
  })

  return response.data
}

export const getPlaceRoute = async ({ planList, transport }: PlanListConfirm) => {
  const data = {
    list: planList,
    transport,
  }

  const response = await api.post('plans/distance', data)

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

  const response = await api.post('plans/route/edit', data)

  return response.data
}

export const savePlan = async (data: any) => {
  const response = await api.post('plans/save', data)

  return response.data
}

export const getPlanList = async (authorId: number) => {
  const response = await api.get('plans', {
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
  const response = await api.get(`plans/${planId}`)

  return response.data
}

export const getPlanByUserId = async (userId: number): Promise<Plans> => {
  const response = await api.get(`plans/user/${userId}`)

  return response.data
}

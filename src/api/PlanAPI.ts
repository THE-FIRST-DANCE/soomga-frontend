import axios from 'axios'
import { GooglePlaceResponse, PlaceData } from 'interfaces/plan'
import { PeriodPlanRecoil } from 'recoil/atoms/PlanList'

const api = axios.create({
  baseURL: 'http://localhost:3000/',
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

interface PlanListResponse {
  list: PeriodPlanRecoil
  transport: string
}

export const getPlaceRoute = async ({ list, transport }: PlanListResponse) => {
  const data = {
    list,
    transport,
  }

  const response = await api.post('plans/distance', data)

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

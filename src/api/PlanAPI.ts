import axios from 'axios'
import { GooglePlaceResponse, PlaceData } from 'interfaces/plan'

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

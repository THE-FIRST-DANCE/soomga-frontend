import { api } from './GuidePageAPI'

export const getTouristList = async ({
  pageParam,
  areas,
  sort,
}: {
  pageParam?: number | null
  areas: number[]
  sort?: string
}) => {
  const response = await api.get('/trips/find', {
    params: {
      cursor: pageParam,
      areas,
      sort,
    },
  })

  return response.data
}

interface createTripDto {
  title: string
  content: string
  tags: string[]
  areaId: number | undefined
  authorId: number
}

export const postTourist = async (data: createTripDto) => {
  const response = await api.post('/trips', data)

  return response.data
}

export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const getTouristDetail = async (id: number) => {
  const response = await api.get(`/trips/${id}`)

  return response.data
}

export const getRecommendation = async () => {
  const response = await api.get('/trips/recommendation')

  return response.data
}

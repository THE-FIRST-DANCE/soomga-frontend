import { baseApi } from 'baseApi'

export const getTouristList = async ({
  pageParam,
  areas,
  sort,
}: {
  pageParam?: number | null
  areas: number[]
  sort?: string
}) => {
  const response = await baseApi.get('/trips/find', {
    params: {
      cursor: pageParam,
      areas,
      sort,
    },
  })

  return response.data
}

export interface createTripDto {
  title: string
  content: string
  tags: string[]
  areaId: number | undefined
  authorId: number
}

export const postTourist = async (data: createTripDto) => {
  const response = await baseApi.post('/trips', data)

  return response.data
}

export const editTourist = async (id: number, data: createTripDto) => {
  const response = await baseApi.patch(`/trips/${id}`, data)

  return response.data
}

export const deleteTouristApi = async (id: number) => {
  const response = await baseApi.delete(`/trips/${id}`)

  return response.data
}

export const imageUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await baseApi.post('uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const getTouristDetail = async (id: number) => {
  const response = await baseApi.get(`/trips/${id}`)

  return response.data
}

export const getRecommendation = async () => {
  const response = await baseApi.get('/trips/recommendation')

  return response.data
}

// 글 좋아요
export const likeTourist = async (id: number) => {
  const response = await baseApi.post(`/trips/${id}/like`)

  return response.data
}

export interface PostComment {
  content: string
  memberId: number
  boardId: number
}

// 댓글 작성
export const postTouristComment = async (data: PostComment) => {
  const { content, memberId, boardId } = data
  const commentDto = {
    content,
    memberId,
  }
  const response = await baseApi.post(`/trips/${boardId}/comment`, commentDto)

  return response.data
}

// 댓글 삭제
export const deleteTouristComment = async (id: number) => {
  const response = await baseApi.delete(`/trips/comment/${id}`)

  return response.data
}

// 댓글 수정
export const editTouristComment = async (commentId: number, content: string) => {
  const response = await baseApi.patch(`/trips/comment/${commentId}`, {
    content,
  })

  return response.data
}

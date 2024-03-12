import { api } from './PlanAPI'

// 일정 저장 데이터
export interface EventAddData {
  memberId: number
  title: string
  start: string
  end: string
  allDay: boolean
  description: string
}

// 일정 추가
export const addEvent = async (data: EventAddData) => {
  const response = await api.post('events', data)

  return response.data
}

// 일정 조회
export const getEvent = async (memberId: number) => {
  const response = await api.get('events', {
    params: {
      memberId,
    },
  })

  return response.data
}

export const deleteEvent = async (id: number) => {
  const response = await api.delete(`events/${id}`)

  return response.data
}

export const updateEvent = async ({ id, data }: { id: number; data: EventAddData }) => {
  const response = await api.post(`events/${id}`, data)
  return response.data
}

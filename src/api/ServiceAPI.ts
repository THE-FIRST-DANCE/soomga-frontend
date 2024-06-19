import { api } from './PlanAPI'

export interface ReservationPayload {
  // memberId: number
  guideId: number
  serviceId: number
  startDate: Date
  endDate: Date
}

export interface Reservation {
  id: number
  createdAt: string
  deletedAt: null | string
  startDate: string
  endDate: string
  guideId: number
  memberId: number
  service: { id: number; name: string; description: string; photo: null | string; guideId: number }
  serviceId: number
  status: string
  updatedAt: string
}

// 1. 서비스 조회
export async function getServices() {
  const res = await api.get('/services')
  return res.data
}

// 예약 만들기
export async function createReservation(payload: ReservationPayload, roomId?: string) {
  try {
    const res = await api.post<Reservation>('/reservations', payload, {
      params: roomId ? { roomId } : {},
    })
    console.log('예약만들기 결과', res)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

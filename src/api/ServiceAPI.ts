import { baseApi } from 'baseApi'

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
  const res = await baseApi.get('/services')
  return res.data
}

// 예약 만들기
export async function createReservation(payload: ReservationPayload, roomId?: string) {
  try {
    const res = await baseApi.post<Reservation>('/reservations', payload, {
      params: roomId ? { roomId } : {},
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export async function getServicesByGuideId(guideId: number) {
  const res = await baseApi.get(`/guides/${guideId}/services`)
  console.log('🚀 ~ getServicesByGuideId ~ res:', res)
  return res.data
}

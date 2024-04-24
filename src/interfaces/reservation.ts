export interface ReservationPayload {
  memberId: number
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

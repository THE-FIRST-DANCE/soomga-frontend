import { baseApi } from 'baseApi'
import { Reservation, ReservationPayload } from './ServiceAPI'

//check: 예약 조회
export async function createReservation(
  payload: ReservationPayload, // data
  roomId?: string,
) {
  try {
    const res = await baseApi.post<Reservation>('/reservations', payload, {
      params: roomId ? { roomId } : {},
    })
    console.log('createReservation의 결과 값', res)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

//check 예약 수락
export async function acceptReservation(reservationId: number, roomId?: string) {
  try {
    const res = await baseApi.patch<Reservation>(
      `/reservations/${reservationId}/accept`,
      {},
      {
        params: roomId ? { roomId } : {},
      },
    )
    console.log(res)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

//check 예약 거절
export async function rejectReservation(reservationId: number, roomId?: string) {
  try {
    const res = await baseApi.patch<Reservation>(
      `/reservations/${reservationId}/reject`,
      {},
      {
        params: roomId ? { roomId } : {},
      },
    )
    console.log(res)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

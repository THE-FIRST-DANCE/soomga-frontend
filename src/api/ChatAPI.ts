import { baseApi } from 'baseApi'
import { MessagePaginate, Room } from '../interfaces/chat'

//!  1. 채팅방 리스트 목록
export async function getRooms() {
  // <Room[]>는 TypeScript의 제네릭 타입을 사용하여 이 요청이 반환할 데이터의 타입을 지정합니다.
  // 이 경우, Room[]은 "배열 형태의 Room 객체"를 의미
  const res = await baseApi.get<Room[]>('/chat') // 1. 채팅방 리스트 목록
  return res.data
}

//! 2. 채팅방 만들기
export async function createRoom(data: { me: number; counterpart: number }) {
  const postData = {
    participants: [data.me, data.counterpart],
  }

  const res = await baseApi.post('/chat', postData)
  return res.data
}

// ! 4. 특정 채팅방의 정보
export async function getRoom(roomId: string) {
  const res = await baseApi.get<Room>(`/chat/${roomId}`)
  4000
  return res.data
}

// ! 5. 채팅방 삭제
export async function deleteRoom(roomId: string) {
  const res = await baseApi.delete(`/chat/${roomId}`)
  return res.data
}
//* fuhqeflihqilw
//! 6. 채팅방 메세지 가져오기
export async function getMessages(roomId: string, cursor?: number, limit?: number) {
  const res = await baseApi.get<MessagePaginate>(`/chat/${roomId}/messages`, {
    params: {
      cursor,
      limit,
    },
  })

  return res.data
}
export async function storeMessage(roomId: string) {
  const res = await baseApi.get(`/chat/${roomId}/messages/store`)

  return res.data
}

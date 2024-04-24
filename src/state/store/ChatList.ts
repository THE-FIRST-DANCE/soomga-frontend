import { atom } from 'recoil'
import { Room } from '../../interfaces/chat'
export const ChatList = atom<Room[]>({
  key: 'chatList',
  default: [],
})

import { atom } from 'recoil'
import { Room } from '../../interfaces/chat'

export const roomState = atom<Room | undefined>({
  key: 'roomState', // 고유한 키
  default: undefined, // 초기 상태
})

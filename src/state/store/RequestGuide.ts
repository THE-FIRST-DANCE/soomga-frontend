import { atom } from 'recoil'

export interface RequestGuideType {
  isClick: boolean
}

export const RequestGuide = atom<RequestGuideType>({
  key: 'requestGuide',
  default: { isClick: false },
})

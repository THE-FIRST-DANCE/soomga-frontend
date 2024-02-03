import { atom } from 'recoil'

export interface PlanInfo {
  title: string
  province: string
  startTime: string
  endTime: string
}

export const planInfo = atom<PlanInfo>({
  key: 'planInfo',
  default: {
    title: '',
    province: '',
    startTime: '',
    endTime: '',
  },
})

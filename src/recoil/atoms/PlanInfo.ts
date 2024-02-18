import { atom } from 'recoil'

export interface PlanInfo {
  title: string
  province: string
  startTime: string
  endTime: string
  lat: number
  lng: number
}

export const PlanInfo = atom<PlanInfo>({
  key: 'planInfo',
  default: {
    title: '',
    province: '',
    startTime: '',
    endTime: '',
    lat: 0,
    lng: 0,
  },
})

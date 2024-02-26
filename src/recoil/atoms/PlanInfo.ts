import { atom } from 'recoil'

export interface PlanInfo {
  title: string
  province: string
  period: number
  lat: number
  lng: number
}

export const PlanInfo = atom<PlanInfo>({
  key: 'planInfo',
  default: {
    title: '',
    province: '',
    period: 1,
    lat: 0,
    lng: 0,
  },
})

export const CurrentPeriod = atom<number>({
  key: 'currentPeriod',
  default: 1,
})

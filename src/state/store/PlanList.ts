import { PlaceData } from 'interfaces/plan'
import { atom } from 'recoil'
import { PlanInfo } from './PlanInfo'

export interface PlanListRecoil {
  item: PlaceData
  nextLat: number
  nextLng: number
  nextPlaceId: number
  nextPlaceName: string
  nextPlaceGoogleId: string
  nextTime: string
  stayTime: string
}

export interface PeriodPlanRecoil {
  [period: number]: PlanListRecoil[]
}

export interface PlanListItem {
  item: PlaceData
  order: number
  stayTime: string
  checked: boolean
}

export interface PeriodList {
  [period: number]: PlanListItem[]
}

export interface PlanListConfirm {
  planList: PeriodList
  transport: string
}

export interface PlanConfirmList {
  periodPlan: PeriodPlanRecoil
  transport: string
  info: PlanInfo
}

export const PlanPeriodList = atom<PlanListItem[]>({
  key: 'PlanPeriodList',
  default: [],
})

export const PeriodPlanRecoil = atom<{ [period: number]: PlanListItem[] }>({
  key: 'PeriodPlan',
  default: {},
})

export const PlanListConfirm = atom<PlanListConfirm>({
  key: 'PlanListConfirm',
  default: {
    planList: {},
    transport: '',
  },
})

export const PlanConfirmList = atom<PlanConfirmList>({
  key: 'PlanConfirmList',
  default: {
    periodPlan: {},
    transport: '',
    info: {
      title: '',
      province: '',
      lat: 0,
      lng: 0,
      period: 0,
    },
  },
})

export const PlanEditList = atom<PlanListConfirm>({
  key: 'PlanEditList',
  default: {
    planList: {},
    transport: '',
  },
})

export const PlanTime = atom<string>({
  key: 'PlanTime',
  default: '12시간 00분',
})

export const PlanPlaceBox = atom<PlaceData[]>({
  key: 'PlanPlaceBox',
  default: [],
})

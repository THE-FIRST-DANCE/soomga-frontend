import { PlaceData } from 'interfaces/plan'
import { atom } from 'recoil'

export interface PlanListRecoil {
  item: PlaceData
  order: number
  stayTime: string
  checked: boolean
}

export interface PeriodPlanRecoil {
  [period: number]: PlanListRecoil[]
}

export interface PlanListConfirm {
  planList: PeriodPlanRecoil
  transport: string
}

export const PlanListRecoil = atom<PlanListRecoil[]>({
  key: 'PlanList',
  default: [],
})

export const PeriodPlanRecoil = atom<{ [period: number]: PlanListRecoil[] }>({
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

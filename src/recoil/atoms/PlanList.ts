import { PlaceData } from 'interfaces/plan'
import { atom } from 'recoil'

export interface PlanListRecoil {
  item: PlaceData
  order: number
  time: string
  checked: boolean
}

export interface PlanListConfirm {
  planList: PlanListRecoil[]
  transportation: string
}

export const PlanListRecoil = atom<PlanListRecoil[]>({
  key: 'PlanList',
  default: [],
})

export const PlanListConfirm = atom<PlanListConfirm>({
  key: 'PlanListConfirm',
  default: {
    planList: [],
    transportation: '',
  },
})

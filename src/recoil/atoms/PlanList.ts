import { PlaceData } from 'interfaces/plan'
import { atom } from 'recoil'

export interface PlanListRecoil {
  item: PlaceData
  order: number
  time: string
  checked: boolean
}

export const PlanListRecoil = atom<PlanListRecoil[]>({
  key: 'PlanList',
  default: [],
})

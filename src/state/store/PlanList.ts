import { PlaceData, PlanConfirmPeriodList } from 'interfaces/plan'
import { atom } from 'recoil'
import { PlanInfo } from './PlanInfo'

// Order 리스트에 들어갈 아이템
export interface PlanListItem {
  item: PlaceData
  order: number
  stayTime: string
  checked: boolean
}

// 날짜별 Order 리스트
export interface PeriodList {
  [period: number]: PlanListItem[]
}

// 여행 일정 확인
export interface PlanConfirm {
  periodPlan: PlanConfirmPeriodList
  transport: string
  info: PlanInfo
}

// 날짜별 여행 order 리스트
export const PeriodPlanRecoil = atom<{ [period: number]: PlanListItem[] }>({
  key: 'PeriodPlan',
  default: {},
})

// 여행 일정 확인
export const PlanConfirmList = atom<PlanConfirm>({
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

export const PlanTime = atom<string>({
  key: 'PlanTime',
  default: '12시간 00분',
})

// 여행장소 추가할 때 장소 저장 리스트
export const PlanPlaceBox = atom<PlaceData[]>({
  key: 'PlanPlaceBox',
  default: [],
})

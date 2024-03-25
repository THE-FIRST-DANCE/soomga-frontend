import { atom } from 'recoil'

export interface MonthAtom {
  month: string
}

export const MonthAtom = atom<MonthAtom>({
  key: 'Month',
  default: { month: '' },
})

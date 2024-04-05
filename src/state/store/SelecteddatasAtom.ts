import { atom } from 'recoil'

export interface SelecteddatasAtomType {
  age: number[]
  temperature: number[]
  guideCount: number[]
  sex: { all: boolean; male: boolean; female: boolean }
  regions: string[]
  languages: string[]
  credentials: string[]
  rating: boolean[]
}

export const selectedDatasState = atom<SelecteddatasAtomType>({
  key: 'selectedDatasState',
  default: {
    age: [],
    temperature: [],
    guideCount: [],
    sex: { all: false, male: false, female: false },
    regions: [],
    languages: [],
    credentials: [],
    rating: [],
  },
})

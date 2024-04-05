import { atom } from 'recoil'

export interface SelecteddatasAtomType {
  age: string[] | number[]
  temperature: string[]
  guideCount: string[]
  gender: { all: boolean; male: boolean; female: boolean }
  areas: number[]
  languages: number[]
  guideCeritifications: number[]
  rating: boolean[]
}

export const selectedDatasState = atom<SelecteddatasAtomType>({
  key: 'selectedDatasState',
  default: {
    age: [],
    temperature: [],
    guideCount: [],
    gender: { all: false, male: false, female: false },
    areas: [],
    languages: [],
    guideCeritifications: [],
    rating: [],
  },
})

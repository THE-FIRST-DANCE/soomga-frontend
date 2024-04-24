import { atom } from 'recoil'
import { boolean } from 'zod'

export interface AccessTokenAtom {
  token: boolean
  name: string
}

export const AccessTokenAtom = atom<AccessTokenAtom>({
  key: 'Token',
  default: { token: false, name: '' },
})

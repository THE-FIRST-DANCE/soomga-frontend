import { atom } from 'recoil'

interface ModalAtomType {
  isOpen: boolean
}

export const ModalAtom = atom<ModalAtomType>({
  key: 'Modal',
  default: { isOpen: false },
})

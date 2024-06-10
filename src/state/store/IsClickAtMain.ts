import { atom } from 'recoil'

interface IsClickAtMainProps {
  isClicked: boolean
}
export const IsClickAtMain = atom<IsClickAtMainProps>({
  key: 'isClickAtMain',
  default: {
    isClicked: false,
  },
})

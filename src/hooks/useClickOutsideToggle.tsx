import { useEffect, useRef, useState } from 'react'

const useClickOutsideToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const refForToggle = useRef<HTMLDivElement>(null)

  // 토글 클릭
  const handleOnClick = () => {
    setIsOpen(!isOpen)
  }

  // 토글 밖 클릭
  const handleOutClick = (e: MouseEvent & { target: Node | null }) => {
    /* 토글상태  &&  Ref가 유효한 요소를 가리키는지 체크 && 클릭을 토글 밖에서 한지 */
    if (isOpen && refForToggle.current && !refForToggle.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutClick)
    return () => {
      // Unmount,isOpen변경 時 실행
      document.removeEventListener('mousedown', handleOutClick)
    }
  }, [isOpen])

  return { isOpen, refForToggle, handleOnClick }
}

export default useClickOutsideToggle

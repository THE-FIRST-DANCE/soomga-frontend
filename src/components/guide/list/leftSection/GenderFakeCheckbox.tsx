import styled from 'styled-components'
import React from 'react'

interface GenderFakeCheckboxProps {
  onClick?: (name: string) => void
  isAllChecked?: boolean
  isManChecked?: boolean
  isWomanChecked?: boolean
  name?: string
}

const GenderFakeCheckbox: React.FC<GenderFakeCheckboxProps> = ({
  name,
  onClick,
  isAllChecked,
  isManChecked,
  isWomanChecked,
}) => {
  // 단일 visible prop을 계산합니다.
  const isVisible = isAllChecked || isManChecked || isWomanChecked

  return (
    <GenderFakeCheckboxStyle
      onClick={() => {
        if (onClick && name) {
          onClick(name)
        }
      }}
    >
      {/* isVisible prop을 CheckStyle에 전달합니다. */}
      <CheckStyle isVisible={isVisible}>✓</CheckStyle>
    </GenderFakeCheckboxStyle>
  )
}

export default GenderFakeCheckbox

const GenderFakeCheckboxStyle = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 3px solid black;
  border-radius: 5px;
  position: relative;
  cursor: pointer; // 사용자에게 클릭 가능함을 표시합니다.
`

const CheckStyle = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  font-size: 35px;
  width: 30px;
  height: 30px;
  color: var(--color-original); // 사용되는 색상 변수, CSS에 정의되어 있어야 합니다.
  text-align: center;
  left: -8px;
  top: -8px;
`

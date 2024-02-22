import { styled } from 'styled-components'

interface RatingFakeCheckboxProps {
  onClick?: (name: string) => void // onClick prop 추가
  // onClick?: (name: string) => void // onClick prop 추가
  checked: boolean
  name?: string // 프롭스로 안넘기는 경우도 잇어서 ? 를 쓰기 때문에 있는지 없는지 if문으로 확인해줘야한다.
}

const RatingFakeCheckbox: React.FC<RatingFakeCheckboxProps> = ({ name, onClick, checked }) => {
  return (
    <RatingFakeCheckboxStyle
      // 가상 checkbox 프레임
      onClick={() => {
        if (onClick && name) {
          onClick(name)
        }
      }}
    >
      {/* 체크 표시 */}
      <RatingCheckStyle checked={checked}>✓</RatingCheckStyle>
    </RatingFakeCheckboxStyle>
  )
}
export default RatingFakeCheckbox

// 가상 checkbox 프레임
const RatingFakeCheckboxStyle = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 3px solid black;
  border-radius: 5px;
  position: relative;
`

// 체크 표시
const RatingCheckStyle = styled.div<RatingFakeCheckboxProps>`
  display: ${({ checked }) => (checked ? 'block' : 'none')};
  /* display: none; */
  position: absolute;
  font-size: 35px;
  width: 30px;
  height: 30px;
  color: var(--color-original);
  text-align: center;
  left: -8px;
  top: -8px;
`

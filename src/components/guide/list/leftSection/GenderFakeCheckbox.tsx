import { styled } from 'styled-components'

interface GenderFakeCheckboxProps {
  onClick?: (name: string) => void // onClick prop 추가

  isAllChecked?: boolean
  isManChecked?: boolean
  isWomanChecked?: boolean
  name?: string // 프롭스로 안넘기는 경우도 잇어서 ? 를 쓰기 때문에 있는지 없는지 if문으로 확인해줘야한다.
}

const GenderFakeCheckbox: React.FC<GenderFakeCheckboxProps> = ({
  name,
  onClick,
  isAllChecked,
  isManChecked,
  isWomanChecked,
}) => {
  return (
    <GenderFakeCheckboxStyle
      // 가상 checkbox 프레임
      onClick={() => {
        {
          onClick && name && onClick(name)
        }

        // if (onClick && name) {
        //   onClick(name)
        // }
      }}
    >
      {/* 체크 표시 */}
      <CheckStyle isAllChecked={isAllChecked} isManChecked={isManChecked} isWomanChecked={isWomanChecked}>
        ✓
      </CheckStyle>
    </GenderFakeCheckboxStyle>
  )
}
export default GenderFakeCheckbox

// 가상 checkbox 프레임
const GenderFakeCheckboxStyle = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 3px solid black;
  border-radius: 5px;
  position: relative;
`

// 체크 표시
const CheckStyle = styled.div<GenderFakeCheckboxProps>`
  display: ${(props) => (props.isAllChecked || props.isManChecked || props.isWomanChecked ? 'block' : 'none')};
  position: absolute;
  font-size: 35px;
  /* font-weight: 700; */
  width: 30px;
  height: 30px;
  color: var(--color-original);
  text-align: center;
  left: -8px;
  top: -8px;
`

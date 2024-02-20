import { styled } from 'styled-components'

interface FakeCheckboxProps {
  onClick?: (name: string) => void // onClick prop 추가

  isAllChecked?: boolean
  isManChecked?: boolean
  isWomanChecked?: boolean
  name?: string // 프롭스로 안넘기는 경우도 잇어서 ? 를 쓰기 때문에 있는지 없는지 if문으로 확인해줘야한다.
}

const FakeCheckbox: React.FC<FakeCheckboxProps> = ({ name, onClick, isAllChecked, isManChecked, isWomanChecked }) => {
  return (
    <FakeCheckboxStyle
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
    </FakeCheckboxStyle>
  )
}
export default FakeCheckbox

// 가상 checkbox 프레임
const FakeCheckboxStyle = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 6px solid var(--color-original);
  position: relative;
`

// 체크 표시
const CheckStyle = styled.div<FakeCheckboxProps>`
  display: ${(props) => (props.isAllChecked || props.isManChecked || props.isWomanChecked ? 'block' : 'none')};
  position: absolute;
  font-size: 25px;
  width: 30px;
  height: 30px;
  text-align: center;
  left: -6px;
  top: -2px;
`

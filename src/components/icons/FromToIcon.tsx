import styled, { CSSProp } from 'styled-components'

interface FromToIconProps {
  style: CSSProp
}
const FromToIcon = ({ ...props }: FromToIconProps) => {
  return (
    <FromToIconStyle
      className="feather feather-arrow-right"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </FromToIconStyle>
  )
}

export default FromToIcon

const FromToIconStyle = styled.svg<FromToIconProps>`
  ${(props) => props.style}
`

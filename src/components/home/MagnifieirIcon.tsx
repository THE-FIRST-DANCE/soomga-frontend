import styled, { CSSProp } from 'styled-components'

interface MagnifieirProps {
  style: CSSProp
}
const MagnifieirIcon = ({ ...props }: MagnifieirProps) => {
  return (
    <MagnifieirStyle
      width="50px"
      {...props}
      version="1.1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/MagnifieirStyle"
    >
      <g id="info" />
      <g id="icons">
        <path
          d="M22.4,19.6l-4.8-4.8c0.9-1.4,1.4-3,1.4-4.8c0-5-4-9-9-9s-9,4-9,9s4,9,9,9c1.8,0,3.4-0.5,4.8-1.4l4.8,4.8   c0.4,0.4,0.9,0.6,1.4,0.6c1.1,0,2-0.9,2-2C23,20.4,22.8,19.9,22.4,19.6z M5,10c0-2.8,2.2-5,5-5s5,2.2,5,5s-2.2,5-5,5S5,12.8,5,10z"
          id="search"
        />
      </g>
    </MagnifieirStyle>
  )
}

export default MagnifieirIcon

const MagnifieirStyle = styled.svg<MagnifieirProps>`
  ${(props) => props.style};
`

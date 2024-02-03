import styled from 'styled-components'

interface HambergProps {
  width?: string
  height?: string
  color?: string
  hoverColor?: string
}

const HambergIcon = ({ ...props }: HambergProps) => {
  return (
    <HambergStyle
      {...props}
      className="feather feather-menu"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <line x1="3" x2="21" y1="12" y2="12" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <line x1="3" x2="21" y1="18" y2="18" />
    </HambergStyle>
  )
}

const HambergStyle = styled.svg<HambergProps>`
  width: ${(props) => props.width || '48px'};
  height: ${(props) => props.height || '48px'};
  fill: ${(props) => props.color || 'black'};
  &:hover {
    fill: ${(props) => props.hoverColor || 'black'};
  }
`

export default HambergIcon

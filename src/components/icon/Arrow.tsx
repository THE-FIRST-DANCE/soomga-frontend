import styled from 'styled-components'

interface ArrowProps {
  $width?: string
  $height?: string
  $color?: string
  $hoverColor?: string
  $angle?: string
}

const Arrow = ({ ...props }: ArrowProps) => {
  return (
    <ArrowStyle {...props} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </ArrowStyle>
  )
}

export default Arrow

const ArrowStyle = styled.svg<ArrowProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  fill: ${(props) => props.$color};
  &:hover {
    fill: ${(props) => props.$hoverColor};
  }
  transform: rotate(${(props) => props.$angle});
`

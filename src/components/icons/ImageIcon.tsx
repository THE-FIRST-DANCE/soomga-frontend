import { styled } from 'styled-components'

interface ImageIconProps {
  width?: string
  height?: string
  color?: string
  hoverColor?: string
}

const ImageIcon = () => {
  return (
    <ImageIconStyle
      id="Layer_1"
      // style={{ enableBackground: 'new 0 0 24 24' }}
      version="1.1"
      viewBox="0 0 24 24"
      // xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path d="M19.235,1.75H4.765c-1.662,0-3.015,1.352-3.015,3.015v14.471c0,1.662,1.352,3.015,3.015,3.015h14.471  c1.662,0,3.015-1.352,3.015-3.015V4.765C22.25,3.102,20.898,1.75,19.235,1.75z M21.044,19.235c0,0.997-0.811,1.809-1.809,1.809  H4.765c-0.997,0-1.809-0.811-1.809-1.809v-2.181l4.866-5.407l6.573,5.975l3.635-3.029l3.015,2.512V19.235z M21.044,15.536  l-3.015-2.512l-3.601,3L7.737,9.94l-4.781,5.312V4.765c0-0.997,0.811-1.809,1.809-1.809h14.471c0.997,0,1.809,0.811,1.809,1.809  V15.536z" />
      <path d="M16.221,10.794c1.662,0,3.015-1.352,3.015-3.015s-1.352-3.015-3.015-3.015c-1.662,0-3.015,1.352-3.015,3.015  S14.558,10.794,16.221,10.794z M16.221,5.971c0.997,0,1.809,0.811,1.809,1.809s-0.811,1.809-1.809,1.809s-1.809-0.811-1.809-1.809  S15.223,5.971,16.221,5.971z" />
    </ImageIconStyle>
  )
}

export default ImageIcon

const ImageIconStyle = styled.svg<ImageIconProps>`
  width: ${(props) => props.width || '30px'};
  height: ${(props) => props.height || '30px'};
  fill: ${(props) => props.color || 'black'};
  &:hover {
    fill: ${(props) => props.hoverColor || 'gray'};
  }
  cursor: pointer;
  padding-top: 5px;
`

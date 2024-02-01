import styled from 'styled-components'

interface ButtonProps {
  onClick?: () => void
  label?: string
  $width?: string
  $height?: string
  $color?: string
  $hasBorder?: boolean
  $borderColor?: string
  $borderRadius?: string
  $fontColor?: string
  $fontSize?: string
  $fontWeight?: string
  $hover?: boolean
  $hoverColor?: string
  $hoverFontColor?: string
  $disabled?: boolean
  $disabledColor?: string
  $disabledFontColor?: string
  $boxShadow?: string
}

const Button = ({ ...props }: ButtonProps) => {
  return <ButtonStyle {...props}>{props.label}</ButtonStyle>
}

const ButtonStyle = styled.button<ButtonProps>`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  color: ${(props) => props.$fontColor};
  background-color: ${(props) => props.color};
  border: ${(props) => (props.$hasBorder ? `1px solid ${props.$borderColor}` : 'none')};
  border-radius: ${(props) => props.$borderRadius};
  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
  box-shadow: ${(props) => props.$boxShadow};
  &:hover {
    background-color: ${(props) => props.$hoverColor};
    color: ${(props) => props.$hoverFontColor};
  }
  &:disabled {
    background-color: ${(props) => props.$disabledColor};
    color: ${(props) => props.$disabledFontColor};
  }
`

export default Button

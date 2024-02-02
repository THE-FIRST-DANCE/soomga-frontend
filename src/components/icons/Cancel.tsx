import styled from 'styled-components'

interface CencelProps {
  $width?: string
  $height?: string
  $color?: string

  onClick?: () => void
}

const Cancel = ({ ...props }) => {
  return (
    <CancelStyle
      {...props}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </CancelStyle>
  )
}

export default Cancel

const CancelStyle = styled.svg<CencelProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  fill: ${(props) => props.$color};
  cursor: pointer;
`

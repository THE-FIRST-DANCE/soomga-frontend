import styled, { CSSProp } from 'styled-components'

interface HeartIconProps {
  style: CSSProp
}

const HeartIcon = ({ ...props }: HeartIconProps) => {
  return (
    <IconStyle {...props} viewBox="0 0 50 50">
      <rect fill="none" height="50" width="50" />
      <path
        d="M35,8  c-4.176,0-7.851,2.136-10,5.373C22.851,10.136,19.176,8,15,8C8.373,8,3,13.373,3,20c0,14,16,21,22,26c6-5,22-12,22-26  C47,13.373,41.627,8,35,8z"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </IconStyle>
  )
}

export default HeartIcon

const IconStyle = styled.svg<HeartIconProps>`
  ${(props) => props.style}
`

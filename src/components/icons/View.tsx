import styled, { CSSProp } from 'styled-components'

interface ViewIconProps {
  style: CSSProp
}

const ViewIcon = ({ ...props }: ViewIconProps) => {
  return (
    <ViewIconStyle {...props} viewBox="0 0 32 32">
      <path
        d="  M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z"
        fill="none"
        id="XMLID_10_"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <circle
        cx="16"
        cy="16"
        fill="none"
        id="XMLID_12_"
        r="5"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </ViewIconStyle>
  )
}

export default ViewIcon

const ViewIconStyle = styled.svg<ViewIconProps>`
  ${(props) => props.style}
`

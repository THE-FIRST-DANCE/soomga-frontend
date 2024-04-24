import styled, { CSSProp } from 'styled-components'

interface ServiceIconProps {
  style: CSSProp
  $hoverColor?: string
  onClick: () => void
}

const ServiceIcon = ({ ...props }: ServiceIconProps) => {
  return (
    <PlanIconStyle
      className="feather feather-shopping-bag"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </PlanIconStyle>
  )
}

export default ServiceIcon

const PlanIconStyle = styled.svg<ServiceIconProps>`
  ${(props) => props.style}
  &:hover {
    stroke: ${(props) => props.$hoverColor || 'gray'};
  }
`

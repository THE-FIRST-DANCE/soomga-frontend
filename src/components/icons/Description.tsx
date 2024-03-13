import styled, { CSSProp } from 'styled-components'

interface DescriptionProps {
  style: CSSProp
}

const Description = ({ ...props }: DescriptionProps) => {
  return (
    <DescriptionStyled {...props} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.75 4.5C2.33579 4.5 2 4.83579 2 5.25C2 5.66421 2.33579 6 2.75 6H17.25C17.6642 6 18 5.66421 18 5.25C18 4.83579 17.6642 4.5 17.25 4.5H2.75Z"
        fill="#212121"
      />
      <path
        d="M2.75 7.5C2.33579 7.5 2 7.83579 2 8.25C2 8.66421 2.33579 9 2.75 9H17.25C17.6642 9 18 8.66421 18 8.25C18 7.83579 17.6642 7.5 17.25 7.5H2.75Z"
        fill="#212121"
      />
      <path
        d="M2 11.25C2 10.8358 2.33579 10.5 2.75 10.5H17.25C17.6642 10.5 18 10.8358 18 11.25C18 11.6642 17.6642 12 17.25 12H2.75C2.33579 12 2 11.6642 2 11.25Z"
        fill="#212121"
      />
      <path
        d="M2.75 13.5C2.33579 13.5 2 13.8358 2 14.25C2 14.6642 2.33579 15 2.75 15H12.25C12.6642 15 13 14.6642 13 14.25C13 13.8358 12.6642 13.5 12.25 13.5H2.75Z"
        fill="#212121"
      />
    </DescriptionStyled>
  )
}

export default Description

const DescriptionStyled = styled.svg<DescriptionProps>`
  ${(props) => props.style}
`

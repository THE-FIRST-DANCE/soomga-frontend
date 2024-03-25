import styled, { CSSProp } from 'styled-components'

interface Props {
  style: CSSProp
}

const Check = ({ ...props }: Props) => {
  return (
    <CheckStyle {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
    </CheckStyle>
  )
}

export default Check

const CheckStyle = styled.svg<Props>`
  ${(props) => props.style}
`

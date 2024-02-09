import styled, { CSSProp } from 'styled-components'

interface PlusProps {
  style: CSSProp
}

const Plus = ({ ...props }: PlusProps) => {
  return (
    <PlusStyled {...props} enableBackground="new 0 0 50 50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <rect fill="none" height="50" width="50" />
      <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="9" x2="41" y1="25" y2="25" />
      <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="25" x2="25" y1="9" y2="41" />
    </PlusStyled>
  )
}

export default Plus

const PlusStyled = styled.svg<PlusProps>`
  ${(props) => props.style}
`

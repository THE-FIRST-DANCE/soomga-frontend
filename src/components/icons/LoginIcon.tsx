import styled from 'styled-components'
interface LoginProps {
  width?: string
  height?: string
  color?: string
  hoverColor?: string
}

const LoginIcon = ({ ...props }: LoginProps) => {
  return (
    <LoginStyle {...props} viewBox="0 0 512 512">
      <title />
      <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm2,96a72,72,0,1,1-72,72A72,72,0,0,1,258,144Zm-2,288a175.55,175.55,0,0,1-129.18-56.6C135.66,329.62,215.06,320,256,320s120.34,9.62,129.18,55.39A175.52,175.52,0,0,1,256,432Z" />
    </LoginStyle>
  )
}

const LoginStyle = styled.svg<LoginProps>`
  width: ${(props) => props.width || '48px'};
  height: ${(props) => props.height || '48px'};
  fill: ${(props) => props.color || 'black'};
  &:hover {
    fill: ${(props) => props.hoverColor || 'black'};
  }
`
export default LoginIcon

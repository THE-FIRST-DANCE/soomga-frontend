import { CSSProp, styled } from 'styled-components'

interface ComunicationProps {
  $width?: string
  $height?: string
}
const Comunication = ({ ...props }: ComunicationProps) => {
  return (
    <ComunicationStyle
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_167_1218)">
        <path
          d="M20.2293 2.25128C21.0255 2.25128 21.7891 2.56756 22.352 3.13053C22.915 3.6935 23.2313 4.45705 23.2313 5.25321V15.76C23.2313 16.5561 22.915 17.3197 22.352 17.8827C21.7891 18.4456 21.0255 18.7619 20.2293 18.7619H15.4863L12.7245 22.1391L9.96275 18.7619H5.2197C4.42354 18.7619 3.65999 18.4456 3.09702 17.8827C2.53405 17.3197 2.21777 16.5561 2.21777 15.76V5.25321C2.21777 4.45705 2.53405 3.6935 3.09702 3.13053C3.65999 2.56756 4.42354 2.25128 5.2197 2.25128H20.2293Z"
          stroke="black"
          stroke-width="2.00129"
        />
      </g>
      <defs>
        <clipPath id="clip0_167_1218">
          <rect width="24.0154" height="24.0154" fill="white" transform="translate(0.716797)" />
        </clipPath>
      </defs>
    </ComunicationStyle>
  )
}

export default Comunication

const ComunicationStyle = styled.svg<ComunicationProps>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`

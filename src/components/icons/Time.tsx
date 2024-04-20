import styled from 'styled-components'

interface TimeProps {
  $width?: string
  $height?: string
  $color?: string
  $marginLeft?: string
}

const Time = ({ ...props }: TimeProps) => {
  return (
    <TimeStyle {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <g data-name="Layer 15" id="Layer_15">
        <path
          className="cls-1"
          d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
        />
        <path className="cls-1" d="M20.24,21.66l-4.95-4.95A1,1,0,0,1,15,16V8h2v7.59l4.66,4.65Z" />
      </g>
    </TimeStyle>
  )
}

export default Time

const TimeStyle = styled.svg<TimeProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  fill: ${(props) => props.$color};
  margin-right: 3px;
  margin-left: ${(props) => props.$marginLeft};
`

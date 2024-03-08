import React from 'react'
import { styled } from 'styled-components'

interface CommentProps {
  $width?: string
  $height?: string
  $fill?: string
  $hoverColor?: string
}

const Comment = ({ ...props }: CommentProps) => {
  return (
    <CommentStyle width="24" height="24" viewBox="0 0 24 24" fill="black" {...props}>
      <svg height="24" viewBox="0 0 24 24" width="24">
        <path
          className="heroicon-ui"
          d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"
        />
      </svg>
    </CommentStyle>
  )
}

export default Comment

const CommentStyle = styled.svg<CommentProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  fill: ${(props) => props.$fill};
  &:hover {
    fill: ${(props) => props.$hoverColor || 'var(--color-primary)'};
  }
  transition: all 0.2s;
`

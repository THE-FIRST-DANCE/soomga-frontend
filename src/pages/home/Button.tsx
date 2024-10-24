import React, { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const ButtonStyled = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: #3498db;
          color: white;
          border: none;
          &:hover {
            background-color: #2980b9;
          }
        `
      case 'secondary':
        return css`
          background-color: #2ecc71;
          color: white;
          border: none;
          &:hover {
            background-color: #27ae60;
          }
        `
      case 'outline':
        return css`
          background-color: transparent;
          color: #3498db;
          border: 1px solid #3498db;
          &:hover {
            background-color: #3498db;
            color: white;
          }
        `
      case 'ghost':
        return css`
          background-color: transparent;
          color: #3498db;
          border: none;
          &:hover {
            background-color: rgba(52, 152, 219, 0.1);
          }
        `
    }
  }}

  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return css`
          font-size: 12px;
          padding: 8px 16px;
        `
      case 'medium':
        return css`
          font-size: 14px;
          padding: 10px 20px;
        `
      case 'large':
        return css`
          font-size: 16px;
          padding: 12px 24px;
        `
    }
  }}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>
}

export default Button

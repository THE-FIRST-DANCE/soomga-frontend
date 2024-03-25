import React from 'react'
import styled, { CSSProp } from 'styled-components'

interface InputProps {
  label?: string
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  fuc?: () => void
  placeholder: string
  style?: CSSProp
}

const Input = ({ label, value, name, onChange, placeholder, style, fuc }: InputProps) => {
  return (
    <InputBox>
      {label && <label>{label}</label>}
      <InputStyled
        style={style}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={(e) => e.key === 'Enter' && fuc && fuc()}
      />
    </InputBox>
  )
}

export default Input

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`

const InputStyled = styled.input<InputProps>`
  width: 100%;
  height: 40px;
  padding: 0 1rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 0.5rem;
  font-size: 16px;
  outline: none;
  transition: 0.2s;
  &:focus {
    border-color: #000;
  }

  ${(props) => props.style}
`

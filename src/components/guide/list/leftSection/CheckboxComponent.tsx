import React from 'react'
import FakeCheckbox from './GenderFakeCheckbox'

interface CheckboxProps {
  id: string
  name: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick: (name: string) => void
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({ id, name, checked, onChange, onClick, label }) => {
  return (
    <>
      <input
        onChange={onChange}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        style={{ display: 'none' }} // Hide the default checkbox
      />
      <FakeCheckbox onClick={onClick} name={name} isAllChecked={checked} />
      <label htmlFor={id}>{label}</label>
    </>
  )
}

export default Checkbox

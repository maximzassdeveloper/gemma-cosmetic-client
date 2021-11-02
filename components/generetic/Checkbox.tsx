import { FC, useState } from 'react'
import { Check } from 'react-feather'

interface CheckboxProps {
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: FC<CheckboxProps> = ({ 
  name, children, onChange 
}) => {

  const [active, setActive] = useState(false)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.checked)
    if (onChange) onChange(e)
  }

  return (
    <label className="checkbox">
      <span className={`checkbox__input${active ? ' checked' : ''}`}>
        <Check className="checkbox__icon" />
        <input 
          name={name}
          type="checkbox" 
          onChange={changeHandler} 
        />
      </span>
      <span className="checkbox__text">{children}</span>
    </label>
  )
}
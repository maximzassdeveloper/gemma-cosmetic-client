import React, { FC, useState, memo } from 'react'
import { UseFormRegister, FieldError } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { EyeOff, Eye } from 'react-feather'
import { useTransition, animated } from '@react-spring/web'
import classnames from '../../utils/classnames'

export interface InputValidateRules {
  required?: boolean | string
  maxLength?: number | { value: number, message: string }
  minLength?: number | { value: number, message: string }
  min?: number | { value: number, message: string }
  max?: number | { value: number, message: string }
  pattern?: RegExp | { value: RegExp, message: string }
}

interface InputProps {
  name: string
  type?: string
  placeholder?: string
  value?: string
  disabled?: boolean
  autoComplete?: 'on' | 'off'
  className?: string
  required?: boolean

  register?: UseFormRegister<any>
  touched?: boolean
  error?: FieldError | undefined
  rules?: InputValidateRules

  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
}

export const Input: FC<InputProps> = memo(({
  name, type, required, placeholder, value, disabled, autoComplete, className, register, touched, error, rules, onChange, onClick, onFocus, onBlur
}) => {

  const [val, setVal] = useState('')
  const [ownType, setOwnType] = useState(type || 'text')

  const inp = React.useRef<HTMLInputElement>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value)
    if (onChange) onChange(e)
  }

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e)
  }

  const errorTransition = useTransition(error, {
    from: { transform: 'translateY(-18px)', opacity: 0 },
    enter: { transform: 'translateY(0px)', opacity: 1 },
    leave: { transform: 'translateY(-18px)', opacity: 0 },
    config: { duration: 150 },
  })

  const classes = classnames(
    'input',
    className,
    { 'password': type === 'password' },
    { 'disabled': disabled } ,
    { 'required': required },
    { 'error': error && touched },
    { 'success': !error && touched },
  )

  return (
    <div className={classes}>
      {register 
        ? <input 
            {...register(name, {...rules})}
            type={ownType}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete || 'off'}
          />
        : <input 
            ref={inp}

            name={name}
            value={value || val}
            type={ownType}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete || 'off'}

            onChange={changeHandler}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={blurHandler}
          />
      }

      <CSSTransition in={ownType === 'password'} timeout={100} mountOnEnter unmountOnExit>
        <EyeOff onClick={() => setOwnType('text')} className="input__icon password" />
      </CSSTransition>
      <CSSTransition in={ownType === 'text' && type === 'password'} timeout={100} mountOnEnter unmountOnExit>
        <Eye onClick={() => setOwnType('password')} className="input__icon password" />
      </CSSTransition>

      {errorTransition((styles, item) => 
        item && touched && (
          <animated.div style={styles} className="input__error">{item.message}</animated.div>
        )
      )}
    </div>
  )
})
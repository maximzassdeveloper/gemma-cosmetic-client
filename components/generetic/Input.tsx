import React, { FC, useState } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import classnames from '../../utils/classnames'
import { useTransition, animated } from '@react-spring/web'
import { CSSTransition } from 'react-transition-group'
import { Eye, EyeOff } from 'react-feather'
import { renderError } from '../../utils/validation'

export interface InputValidateRules {
  required?: boolean | string
  maxLength?: number | { value: number, message: string }
  minLength?: number | { value: number, message: string }
  min?: number | { value: number, message: string }
  max?: number | { value: number, message: string }
  pattern?: RegExp | { value: RegExp, message: string }
}

interface InputProps {
  register?: UseFormRegister<any>
  error?: FieldError | undefined
  touched?: boolean
  rules?: InputValidateRules

  name: string
  type?: string
  value?: string
  className?: string
  placeholder?: string
  autoComplete?: 'off' | 'on'
  style?: React.CSSProperties
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Input: FC<InputProps> = ({ 
  register, error, touched, rules, name, type, className, placeholder, autoComplete, style, value,  onChange
}) => {

  const [password, setPassword] = useState<boolean | null>(type === 'password' || null)

  const classes = classnames(
    'input', 
    className, 
    { 'password': type === 'password' },
    { 'error': touched && error },
    { 'success': touched && !error },
    { 'required': rules?.required }
  )

  const errorTransition = useTransition(error, {
    from: { transform: 'translateY(-18px)', opacity: 0 },
    enter: { transform: 'translateY(0px)', opacity: 1 },
    leave: { transform: 'translateY(-18px)', opacity: 0 },
    config: { duration: 150 },
  })
  
  return (
    <div className={classes}>
      {register
        ? <input 
          {...register(name, {...rules})}
          type={password === null ? type || 'text' : password ? type : 'text'}
          placeholder={placeholder}
          autoComplete={autoComplete || 'off'}
          style={style}
        />
        : <input 
          onChange={onChange}
          value={value || ''}
          type={password === null ? type || 'text' : password ? type : 'text'}
          placeholder={placeholder}
          autoComplete={autoComplete || 'off'}
          style={style}
        />
      }

      <CSSTransition in={password !== null && password} timeout={100} mountOnEnter unmountOnExit>
        <EyeOff onClick={() => setPassword(false)} className="input__icon password" />
      </CSSTransition>
      <CSSTransition in={password !== null && !password} timeout={100} mountOnEnter unmountOnExit>
        <Eye onClick={() => setPassword(true)} className="input__icon password" />
      </CSSTransition>

      {errorTransition((styles, item) => 
        touched && item && (
          <animated.div style={styles} className="input__error">{renderError(item, rules)}</animated.div>
        )
      )}
    </div>
  )
}
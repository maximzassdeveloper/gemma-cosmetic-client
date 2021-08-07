import React, { FC, useState, useEffect, memo } from 'react'
import classnames from 'classnames'
import { useTransition, animated } from '@react-spring/web'
import { CSSTransition } from 'react-transition-group'
import { AlertCircle, Smile, Eye, EyeOff } from 'react-feather'
import { IValidateOptions, validation } from '../../utils/validation'

export interface InputData {
  value: string
  touched: boolean
  error: string
  name: string
}

interface InputProps {
  name: string
  defaultValue?: string
  type?: string
  className?: string
  rules?: IValidateOptions
  placeholder?: string
  autoComplete?: 'off' | 'on'
  touch?: boolean
  style?: React.CSSProperties
  onData?: (data: InputData) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onClick?: React.MouseEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
}

export const Input: FC<InputProps> = memo(({ 
  name, defaultValue, type, rules, className, placeholder, touch, autoComplete, style, onData, onChange, onClick, onBlur, onFocus
}) => {

  const [value, setValue] = useState(defaultValue || '')
  const [touched, setTouched] = useState(touch || false)
  const [error, setError] = useState('')
  const [password, setPassword] = useState<boolean | null>(type === 'password' || null)

  useEffect(() => {
    if (touch !== undefined && touch !== touched) {
      setTouched(touch)
      setError(validation(value, rules))
    }
  }, [touch])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = e.target
    setValue(value)
    setError(validation(value, rules))

    if (onData) onData({ value, touched, error, name })
    if (onChange) onChange(e)
  }

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true)
    setError(validation(value, rules))

    if (onData) onData({ value, touched, error, name })
    if (onBlur) onBlur(e)
  }

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
      <input 
        name={name}
        type={password === null ? type || 'text' : password ? type : 'text'}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete || 'off'}
        style={style}
        onChange={changeHandler}
        onClick={onClick}
        onBlur={blurHandler}
        onFocus={onFocus}
      />

      <CSSTransition in={password !== null && password} timeout={100} mountOnEnter unmountOnExit>
        <EyeOff onClick={() => setPassword(false)} className="input__icon password" />
      </CSSTransition>
      <CSSTransition in={password !== null && !password} timeout={100} mountOnEnter unmountOnExit>
        <Eye onClick={() => setPassword(true)} className="input__icon password" />
      </CSSTransition>

      {/* <CSSTransition in={touched && !!error} timeout={100} mountOnEnter unmountOnExit>
        <AlertCircle className="input__icon error" />
      </CSSTransition>
      <CSSTransition in={touched && !error} timeout={100} mountOnEnter unmountOnExit>
        <Smile className="input__icon success" />
      </CSSTransition> */}

      {errorTransition((styles, item) => 
        touched && item && <animated.div style={styles} className="input__error">{item}</animated.div>
      )}
    </div>
  )
})
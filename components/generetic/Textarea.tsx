import React, { FC, useState } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import classnames from '../../utils/classnames'
import { useTransition, animated } from '@react-spring/web'
import { renderError } from '../../utils/validation'

export interface InputValidateRules {
  required?: boolean | string
  maxLength?: number | { value: number, message: string }
  minLength?: number | { value: number, message: string }
  min?: number | { value: number, message: string }
  max?: number | { value: number, message: string }
  pattern?: RegExp | { value: RegExp, message: string }
}

interface TextareaProps {
  register: UseFormRegister<any>
  error?: FieldError | undefined
  touched?: boolean
  rules?: InputValidateRules

  name: string
  className?: string
  placeholder?: string
  autoComplete?: 'off' | 'on'
  style?: React.CSSProperties
}

export const Textarea: FC<TextareaProps> = ({ 
  register, error, touched, rules, name, className, placeholder, autoComplete, style
}) => {
  const classes = classnames(
    'input textarea', 
    className, 
    { 'error': touched && error },
    { 'success': touched && !error },
    { 'required': rules?.required }
  )

  const errorTransition = useTransition(error, {
    from: { transform: 'translateX(-10px)', opacity: 0 },
    enter: { transform: 'translateX(0px)', opacity: 1 },
    leave: { transform: 'translateX(-0px)', opacity: 0 },
    config: { duration: 150 },
  })
  
  return (
    <div className={classes}>
      <textarea 
        {...register(name, {...rules})}
        placeholder={placeholder}
        autoComplete={autoComplete || 'off'}
        style={style}
      />

      {errorTransition((styles, item) => 
        touched && item && (
          <animated.div style={styles} className="input__error">{renderError(item, rules)}</animated.div>
        )
      )}
    </div>
  )
}
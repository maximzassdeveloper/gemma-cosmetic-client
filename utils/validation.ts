import { FieldError } from 'react-hook-form'
import { InputValidateRules } from '../components/generetic/Input'

export interface IValidateOptions {
  required?: boolean
  email?: boolean
  min?: number
  max?: number
  password?: string
}

export const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email: string): boolean {
  const re = emailRegExp
  return re.test(String(email).toLowerCase())
}

export const validation = (value: string, options?: IValidateOptions): string => {
  let error = ''
  if (!options) return error

  if (options.min && value.trim().length < options.min) {
    error = `Минимальная длина ${options.min}`
  }

  if (options.max && value.trim().length > options.max) {
    error = `Максимальная длина ${options.max}`
  }

  if (options.email && !validateEmail(value.trim())) {
    error = 'Невалидный email'
  }

  if (options.password && options.password !== value.trim()) {
    error = 'Пароли не совпадают'
  }

  if (options.required && !value.trim()) {
    error = 'Поле обязательно для заполнения'
  }

  return error
}

export const renderError = (error: FieldError, rules?: InputValidateRules): string => {
  if (!rules) return ''
  if (error.message) return error.message

  if (error.type === 'required') return 'Обязательно для заполнения'
  if (error.type === 'minLength') return `Минимальная длина ${rules.minLength}`
  if (error.type === 'maxLength') return `Максимальная длина ${rules.maxLength}`

  return 'Неправильно введены данные'
}
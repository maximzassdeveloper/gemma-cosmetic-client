export interface IValidateOptions {
  required?: boolean
  email?: boolean
  min?: number
  max?: number
  password?: string
}

export function validateEmail(email: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
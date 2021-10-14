import * as yup from 'yup'

export const callToActionSchema = yup.object({
  name: yup.string().required('Имя обязательно для заполнения'),
  email: yup.string().email('Некорректная почта').required('Почта обязательно для заполнения'),
})

export const loginSchema = yup.object({
  email: yup.string().email('Некорректная почта').required('Почта обязательно для заполнения'),
  password: yup.string().required('Пароль обязателен для заполнения')
})

export const registerSchema = yup.object({
  name: yup.string().required('Имя обязательно для заполнения'),
  email: yup.string().email('Некорректная почта').required('Почта обязательна для заполнения'),
  password: yup.string().required('Пароль обязателен для заполнения')
})
import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { IValidateOptions, validation } from '../../utils/validation'
import { Button } from './Button'
import { Input, InputData } from './Input'

interface FormDataInput {
  type?: string
  value: string
  placeholder: string
  error: string
  touched: boolean
  rules?: IValidateOptions
}

export interface FormData {
  [name: string]: FormDataInput
}

export interface FormDto {
  [name: string]: string
}

interface FormProps {
  className?: string
  data: FormData
  buttonValue?: string
  onSubmit?: (data: FormDto) => void
}

export const Form: FC<FormProps> = ({
  children, data, buttonValue, className, onSubmit
}) => {

  const [formData, setFormData] = useState(data)
  const router = useRouter()

  const dataHandler = ({ value, name, error, touched }: InputData) => {
    setFormData({
      ...formData,
      [name]: { ...formData[name], value, error, touched }
    })
  }

  const generateFormDto = (data: FormData): FormDto => {
    const formDto: FormDto = {}
    Object.entries(data).forEach(([key, value]) => {
      formDto[key] = value.value
    })
    return formDto
  }

  const touchAll = (data: FormData): FormData => {
    const newData = {...data}
    Object.values(newData).forEach(i => {
      i.touched = true
    })
    setFormData(newData)
    return newData
  }

  const checkErrors = (data: FormData): boolean => {
    let success = true
    Object.values(data).forEach(i => {
      if (validation(i.value, i.rules)) success = false
    })
    return success
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setFormData(touchAll(formData))
    const success = checkErrors(formData)

    if (success) {
      router.push('/')
      if (onSubmit) onSubmit(generateFormDto(formData))
    }
  }

  return (
    <form className={`form ${className || ''}`.trim()} onSubmit={submitHandler}>
      {Object.entries(formData).map(([name, value], index) =>
        <Input 
          key={index+name}
          type={value.type}
          name={name}
          placeholder={value.placeholder}
          rules={name === 'confirmPassword' ? {...value.rules, password: formData.password.value} : value.rules}
          touch={value.touched}
          onData={d => dataHandler(d)}
        />
      )}
      <Button type='submit'>{buttonValue || 'Отправить'}</Button>
      {children}
    </form>
  )
}
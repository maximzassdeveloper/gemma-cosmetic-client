import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTypesSelector } from '../hooks/useTypedSelector'
import authAxios from '../services/axiosService'
import { emailRegExp } from '../utils/validation'
import { Button, Input } from './generetic'

interface FormInputs {
  name: string
  surname?: string
  email: string
  phone?: string
}

export const PersonalAreaForm: FC = () => {

  const { user, isAuth } = useTypesSelector(({ user }) => user)
  const { register, handleSubmit, setValue } = useForm<FormInputs>()

  useEffect(() => {
    if (isAuth) {
      setValue('name', user.name)
      setValue('surname', user.surname)
      setValue('email', user.email)
      setValue('phone', user.phone)
    }
  }, [isAuth])

  const onSubmit = handleSubmit(async ({ name, surname, email, phone }) => {
    await authAxios.put('/users/update', { name, surname, email, phone })
  })

  return (
    <div className="personal-area__form">
      <form onSubmit={onSubmit}>
        <Input 
          name='name'
          register={register}
          rules={{ required: true }}
          placeholder='Имя'
        />
        <Input 
          name='surname'
          register={register}
          placeholder='Фамилия'
        />
        <Input 
          name='email'
          register={register}
          rules={{ required: true, pattern: {
            value: emailRegExp,
            message: 'Некорректная почта'
          } }}
          placeholder='Почта'
        />
        <Input 
          name='phone'
          register={register}
          placeholder='Телефон'
        />
        <Button type='submit'>Отправить</Button>
      </form>
    </div>
  )
}
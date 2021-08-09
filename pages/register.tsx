import React from 'react'
import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Main, Container } from '../components/hoc'
import { Input, Button } from '../components/generetic'
import { useStores } from '../store'
import { emailRegExp } from '../utils/validation'


interface RegisterInputs {
  name: string
  surname?: string
  email: string
  password: string
}

const Register: NextPage = observer(() => {

  const { userStore } = useStores()
  const {   
    register, 
    handleSubmit, 
    formState: { errors, touchedFields } 
  } = useForm<RegisterInputs>()

  const onSubmit = handleSubmit(data => {
    userStore.register(data)
  })
  
  return (
    <Main>
      <Container>
        <div className="lr-form">

          <div className="lr-form__header">
            <h1>Регистрация</h1>
          </div>

          <form onSubmit={onSubmit}>
            <Input 
              name='name'
              register={register}
              error={errors.name}
              touched={touchedFields.name}
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
              error={errors.email}
              touched={touchedFields.email}
              rules={{ required: true, pattern: {
                value: emailRegExp,
                message: 'Некорректная почта'
              } }}
              placeholder='Почта'
            />
            <Input 
              name='password'
              type='password'
              register={register}
              error={errors.password}
              touched={touchedFields.password}
              rules={{ required: true }}
              placeholder='Пароль'
            />
            <Button type='submit'>Отправить</Button>
          </form>

          <p className="lr-form__link">Уже есть акканут?<Link href='/login'>Вход</Link></p>
        </div>
      </Container>
    </Main>
  )
})

export default Register
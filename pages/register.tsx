import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Main, Container } from '../components/hoc'
import { Input, Button } from '../components/generetic'
import { useActions } from '../hooks/useActions'
import { useTypesSelector } from '../hooks/useTypedSelector'
import { registerSchema } from '../utils/validationSchemas'

interface RegisterInputs {
  name: string
  surname?: string
  email: string
  password: string
}

const Register: NextPage = () => {

  const { register: registerFunc, cleanError } = useActions()
  const { loading, error } = useTypesSelector(state => state.user)
  const form = useForm<RegisterInputs>({
    mode: 'onChange',
    resolver: yupResolver(registerSchema)
  })
  const router = useRouter()
  const [btnText, setBtnText] = React.useState('Отправить')

  const onSubmit = form.handleSubmit(data => {
    registerFunc(data)
  })

  React.useEffect(() => {
    if (!error && !loading && form.formState.isSubmitted) {
      setBtnText('Успешно')
      router.push('/')
    }
  }, [error, loading])

  React.useEffect(() => {
    cleanError()
  }, [])
  
  return (
    <Main title={'Регистрация'}>
      <Container>
        <div className="lr-form">

          <div className="lr-form__header">
            <h1>Регистрация</h1>
          </div>

          <form onSubmit={onSubmit}>
            <Input 
              name='name'
              register={form.register}
              error={form.formState.errors.name}
              touched={form.formState.touchedFields.name}
              required
              placeholder='Имя'
            />
            <Input 
              name='surname'
              register={form.register}
              placeholder='Фамилия'
            />
            <Input 
              name='email'
              register={form.register}
              error={form.formState.errors.email}
              touched={form.formState.touchedFields.email}
              required
              placeholder='Почта'
            />
            <Input 
              name='password'
              type='password'
              register={form.register}
              error={form.formState.errors.password}
              touched={form.formState.touchedFields.password}
              required
              placeholder='Пароль'
            />
            <Button 
              loading={loading} 
              type='submit'
            >
              {btnText}
            </Button>
            {!!error && <p className="lr-form__error">{error}</p>}
          </form>

          <p className="lr-form__link">Уже есть акканут?<Link href='/login'>Вход</Link></p>
        </div>
      </Container>
    </Main>
  )
}

export default Register
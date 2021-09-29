import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Main, Container } from '../components/hoc'
import { Input, Button } from '../components/generetic'
import { emailRegExp } from '../utils/validation'
import { useActions } from '../hooks/useActions'
import { useTypesSelector } from '../hooks/useTypedSelector'

interface LoginInputs {
  email: string
  password: string
}

const Login: NextPage = () => {

  const { login, cleanError } = useActions()
  const { loading, error } = useTypesSelector(state => state.user)
  const { register, handleSubmit, formState: { errors, touchedFields, isSubmitted } } = useForm<LoginInputs>()
  const router = useRouter()
  const [btnText, setBtnText] = React.useState('Отправить')

  const onSubmit = handleSubmit(data => {
    login(data)
  })

  React.useEffect(() => {
    if (!error && !loading && isSubmitted) {
      setBtnText('Успешно')
      router.push('/')
    }
  }, [error, loading])

  React.useEffect(() => {
    cleanError()
  }, [])
  
  return (
    <Main title={'Авторизация'}>
      <Container>
        <div className="lr-form">

          <div className="lr-form__header">
            <h1>Вход</h1>
          </div>

          <form onSubmit={onSubmit}>
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
            <Button 
              loading={loading} 
              type='submit'
            >
              {btnText}
            </Button>
            {!!error && <p className="lr-form__error">{error}</p>}
          </form>
          
          <p className="lr-form__link">Нет аккаунта?<Link href='/register'>Зарегистрируйтесь</Link></p>
        </div>
      </Container>
    </Main>
  )
}

export default Login
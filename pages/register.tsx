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

interface RegisterInputs {
  name: string
  surname?: string
  email: string
  password: string
}

const Register: NextPage = () => {

  const { register: registerFunc } = useActions()
  const { loading, error } = useTypesSelector(state => state.user)
  const { register, handleSubmit, formState: { errors, touchedFields, isSubmitted } } = useForm<RegisterInputs>()
  const router = useRouter()

  const onSubmit = handleSubmit(data => {
    registerFunc(data)
  })

  React.useEffect(() => {
    if (!error && !loading && isSubmitted) router.push('/')
  }, [error, loading])
  
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
            <Button 
              loading={loading} 
              type='submit'
            >
              {(loading || !isSubmitted || error) && 'Отправить'}
              {!loading && isSubmitted && !error && 'Успешно'}
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
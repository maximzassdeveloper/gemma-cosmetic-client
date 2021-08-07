import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Container, Main } from '../components/hoc'
import { Form, FormData, FormDto } from '../components/generetic'
import { useStores } from '../store'
import { observer } from 'mobx-react-lite'
import { RegisterDto } from '../utils/dto'

const registerData: FormData = {
  name: { 
    value: '', 
    placeholder: 'Имя', 
    error: '', 
    touched: false, 
    rules: { required: true },
  },
  surname: { 
    value: '', 
    placeholder: 'Фамилия', 
    error: '', 
    touched: false,
  },
  email: { 
    value: '', 
    placeholder: 'Email', 
    error: '', 
    touched: false, 
    rules: { required: true, email: true } 
  },
  password: { 
    type: 'password', 
    value: '', 
    placeholder: 'Пароль', 
    error: '', 
    touched: false, 
    rules: { required: true, min: 4, max: 20 } 
  },
  confirmPassword: { 
    type: 'password', 
    value: '', 
    placeholder: 'Пароль еще раз', 
    error: '', 
    touched: false, 
    rules: { required: true, min: 4, max: 20, password: '' } 
  }
}

const Register: NextPage = observer(() => {

  const { userStore } = useStores()

  const submitHandler = (data: FormDto) => {
    userStore.register(new RegisterDto(data))
  }
  
  return (
    <Main>
      <Container>
        <div className="lr-form">
          <div className="lr-form__header">
            <h1>Регистрация</h1>
          </div>
          <Form 
            data={registerData} 
            onSubmit={d => submitHandler(d)}
            buttonValue={'Регистрация'}
          />
          <p className="lr-form__link">Уже есть акканут?<Link href='/login'>Вход</Link></p>
        </div>
      </Container>
    </Main>
  )
})

export default Register
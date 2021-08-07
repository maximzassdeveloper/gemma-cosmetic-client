import { NextPage } from 'next'
import Link from 'next/link'
import { Form, FormData, FormDto } from '../components/generetic'
import { Container, Main } from '../components/hoc'
import { useStores } from '../store'
import { LoginDto } from '../utils/dto'

const formData: FormData = {
  email: { 
    value: '', 
    placeholder: 'Email', 
    error: '', 
    touched: false, 
    rules: { required: true, email: true } 
  },
  password: {
    value: '',
    type: 'password',
    placeholder: 'Пароль',
    error: '',
    touched: false,
    rules: { required: true }
  }
}

const Login: NextPage = () => {

  const { userStore, cartStore } = useStores()

  const submitHandler = (data: FormDto) => {
    userStore.login(new LoginDto(data))
    cartStore.getCart()
  }

  return (
    <Main>
      <Container>
        <div className="lr-form">
          <div className="lr-form__header">
            <h1>Вход</h1>
          </div>
          <Form 
            data={formData}
            buttonValue='Вход'
            onSubmit={d => submitHandler(d)}
          />
          <p className="lr-form__link">Нет аккаунта?<Link href='/register'>Зарегистрируйтесь</Link></p>
        </div>
      </Container>
    </Main>
  )
}

export default Login
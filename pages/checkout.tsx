import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { useTypesSelector } from '../hooks/useTypedSelector'
import { Input, Button } from '../components/generetic'
import { Container, Main } from '../components/hoc'
import { emailRegExp } from '../utils/validation'
import { CheckoutForm } from '../components/Checkout/CheckoutForm'

interface FormInputs {
  name: string
  surname?: string
  email: string
  phone: string
}

const CheckoutPage: NextPage = () => {

  const { user } = useTypesSelector(state => state.user)
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone
    }
  })

  const formSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Main title={'Страница оформления заказа'}>
      <Container>
        <div className="checkout page">
          <h1>Оформление заказа</h1>
          <CheckoutForm />
        </div>
      </Container>
    </Main>
  )
}

export default CheckoutPage
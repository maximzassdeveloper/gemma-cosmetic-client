import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useTypesSelector } from '../../hooks/useTypedSelector'
import authAxios from '../../services/axiosService'
import { Input, Button, Textarea } from '../generetic'
import { emailRegExp } from '../../utils/validation'
import { route } from 'next/dist/next-server/server/router'

interface FormInputs {
  name: string
  surname?: string
  email: string
  phone: string
  comment?: string
}

export const CheckoutForm: FC = () => {

  const router = useRouter()
  const { user, isAuth } = useTypesSelector(({ user }) => user)
  const { products } = useTypesSelector(({ cart }) => cart)
  const { register,handleSubmit, setValue } = useForm<FormInputs>()

  useEffect(() => {
    if (isAuth) {
      setValue('name', user.name)
      setValue('surname', user.surname)
      setValue('email', user.email)
      setValue('phone', user.phone || '')
    }
  }, [isAuth])

  const onSubmit = handleSubmit(async ({ name, surname, email, phone, comment }) => {
    await authAxios.put('/users/update', { name, surname, email, phone })
    await authAxios.post('/orders/create', { comment, products })
    router.push('/user/' + user.id)
  })

  return (
    <div className="checkout__form">
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
          rules={{ required: true }}
          placeholder='Телефон'
        />
        <Textarea 
          name='comment'
          register={register}
          placeholder='Комментрарий к заказу'
        />
        <Button type='submit'>Оформить заказ</Button>
      </form>
    </div>
  )
}
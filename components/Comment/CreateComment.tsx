import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useStores } from '../../store'
import { Button, Textarea } from '../generetic'
import { CreateRating } from './CreateRating'
import authAxios from '../../services/axiosService'

interface CreateCommentProps {
  productId: number
}

interface FormInputs {
  rating: number
  message: string
}

export const CreateComment: FC<CreateCommentProps> = observer(({ productId }) => {

  const { userStore: { user, isAuth } } = useStores()
  const { 
    register, 
    setValue, 
    handleSubmit, 
    formState: { errors, touchedFields, isSubmitted } 
  } = useForm<FormInputs>()
  const [ratingError, setRatingError] = useState(true)

  const fullName = (): string => {
    return (user.name + ' ' + user.surname).trim()
  }

  const onSubmit = handleSubmit(async ({ rating, message }) => {
    if (!ratingError) {
      await authAxios.post('/comments/create', { name: fullName(), rating, message, productId })
    }
  }) 

  const ratingHandler = (value: number) => {
    setValue('rating', value)
    setRatingError(false)
  }

  return (
    <div className="create-comment">
      <h3>Оставить отзыв</h3>
      {!isAuth && <p>Чтобы оставить отзыв нужно <Link href='/login'>Авторизоваться</Link></p>}
      {isAuth && <form onSubmit={onSubmit}>
        <h4>{fullName()}</h4>
        <CreateRating onChange={v => ratingHandler(v)} error={ratingError && isSubmitted} />
        <Textarea 
          name='message'
          placeholder={'Текст отзывы'}
          register={register}
          rules={{ required: true, minLength: 3 }}
          error={errors.message}
          touched={touchedFields.message}
        />
        {/* {ratingError && isSubmitted && <p>Обязательно для заполнения</p>} */}
        <Button type='submit'>Отправить</Button>
      </form>}
    </div>
  )
})
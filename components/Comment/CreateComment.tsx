import { FC, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button, Textarea } from '../generetic'
import { CreateRating } from './CreateRating'
import authAxios from '../../services/axiosService'
import { useTypesSelector } from '../../hooks/useTypedSelector'
import { IComment } from '../../types/product'

interface CreateCommentProps {
  productId: number
  onCreate: (comment: IComment) => void
}

interface FormInputs {
  rating: number
  message: string
}

export const CreateComment: FC<CreateCommentProps> = ({ productId, onCreate }) => {

  const { isAuth, user } = useTypesSelector(state => state.user)
  const { 
    reset,
    register, 
    setValue, 
    handleSubmit, 
    formState: { errors, touchedFields, isSubmitted } 
  } = useForm<FormInputs>()
  const [ratingError, setRatingError] = useState(true)

  const onSubmit = handleSubmit(async ({ rating, message }) => {
    if (!ratingError) {
      const { data } = await authAxios.post(
        '/comments/create', 
        { name: user.fullName, rating, message, productId }
      )
      onCreate(data)
      reset()
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
        <h4>{user.fullName}</h4>
        <CreateRating  
          onChange={v => ratingHandler(v)} 
          error={ratingError && isSubmitted} 
        />
        <Textarea 
          name='message'
          placeholder={'Текст отзывы'}
          register={register}
          rules={{ required: true, minLength: 3 }}
          error={errors.message}
          touched={touchedFields.message}
        />
        <Button type='submit'>Отправить</Button>
      </form>}
    </div>
  )
}
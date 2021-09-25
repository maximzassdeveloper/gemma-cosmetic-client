import { FC, useState } from 'react'
import Link from 'next/link'
import { Button, Textarea, FileUpload } from '../generetic'
import { CreateRating } from './CreateRating'
import authAxios from '../../services/axiosService'
import { IComment } from '../../types/product'
import { useTypesSelector } from '../../hooks/useTypedSelector'

interface CreateCommentProps {
  productId: number
  onCreate: (comment: IComment) => void
}

export const CreateComment: FC<CreateCommentProps> = ({ productId, onCreate }) => {

  const { user, isAuth } = useTypesSelector(state => state.user)
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])

  const reset = () => {
    setRating(0)
    setMessage('')
    setFiles([])
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !rating) return
    
    const formData = new FormData()
    formData.append('message', message)
    formData.append('rating', rating.toString())
    formData.append('productId', productId.toString())
    formData.append('name', user.fullName)
    files.forEach((x, ind) => formData.append(`file${ind}`, x))

    const { data } = await authAxios.post('/comments/create', formData)
    onCreate(data)

    reset()
  }

  return (
    <div className="create-comment">
      <h3>Оставить отзыв</h3>
      {!isAuth && <p>Чтобы оставить отзыв нужно <Link href='/login'>Авторизоваться</Link></p>}
      {isAuth && <form onSubmit={submitHandler}>
        <h4>{user.fullName}</h4>
        <CreateRating  
          onChange={r => setRating(r)} 
          stars={rating}
        />
        <Textarea 
          value={message}
          onChange={e => setMessage(e.target.value)}
          name='message'
          placeholder={'Текст отзывы'}
        />
        <FileUpload 
          name='comment-images' 
          files={files}
          onChange={f => setFiles(f)}
          multiple 
        />
        <Button type='submit'>Отправить</Button>
      </form>}
    </div>
  )
}

// export const CreateComment: FC<CreateCommentProps> = ({ productId, onCreate }) => {

//   const { isAuth, user } = useTypesSelector(state => state.user)
//   const { 
//     reset,
//     register, 
//     setValue, 
//     getValues,
//     handleSubmit, 
//     formState: { errors, touchedFields, isSubmitted } 
//   } = useForm<FormInputs>()
//   const [ratingClear, setRatingClear] = useState(false)
//   const [ratingError, setRatingError] = useState(true)

//   const onSubmit = handleSubmit(async ({ rating, message, files }) => {
//     if (!ratingError) {

//       const formData = new FormData()
//       formData.append('rating', rating.toString())
//       formData.append('message', message)
//       formData.append('name', user.fullName)
//       formData.append('productId', productId.toString())
//       if (files) {
//         files.forEach((f, index) => formData.append(`file${index}`, f))
//       }

//       const { data } = await authAxios.post('/comments/create', formData)
//       onCreate(data)
//       reset()
//       setRatingClear(true)
//     }
//   }) 

//   const ratingHandler = (value: number) => {
//     setValue('rating', value)
//     setRatingError(false)
//     setRatingClear(false)
//   }

//   return (
//     <div className="create-comment">
//       <h3>Оставить отзыв</h3>
//       {!isAuth && <p>Чтобы оставить отзыв нужно <Link href='/login'>Авторизоваться</Link></p>}
//       {isAuth && <form onSubmit={onSubmit}>
//         <h4>{user.fullName}</h4>
//         <CreateRating  
//           onChange={v => ratingHandler(v)} 
//           error={ratingError && isSubmitted} 
//           clear={ratingClear}
//         />
//         <Textarea 
//           name='message'
//           placeholder={'Текст отзывы'}
//           register={register}
//           rules={{ required: true, minLength: 10 }}
//           error={errors.message}
//           touched={touchedFields.message}
//         />
//         <FileUpload 
//           name='comment-images' 
//           onChange={f => setValue('files', f)}
//           multiple 
//         />
//         <Button type='submit'>Отправить</Button>
//       </form>}
//     </div>
//   )
// }
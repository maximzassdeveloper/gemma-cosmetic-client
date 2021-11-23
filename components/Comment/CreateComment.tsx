import { FC, useState } from 'react'
import Link from 'next/link'
import { Button, Textarea, FileUpload } from '../generetic'
import { CreateRating } from './CreateRating'
import authAxios from '../../services/axiosService'
import { IComment, IFile } from '../../types/product'
import { useTypesSelector } from '../../hooks/useTypedSelector'

interface CreateCommentProps {
  productId: number 
  onCreate: (comment: IComment) => void
}

export const CreateComment: FC<CreateCommentProps> = ({ productId, onCreate }) => {

  const { user, isAuth } = useTypesSelector(state => state.user)
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<IFile[]>([])

  const reset = () => {
    setRating(0)
    setMessage('')
    setFiles([])
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !rating) return

    const { data } = await authAxios.post('/comments/create', { 
      rating, 
      productId, 
      message, 
      files, 
      name: user.fullName
    })
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
          onChange={setRating} 
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
          onChange={setFiles}
          files={files}
          multiple 
        />
        <Button type='submit'>Отправить</Button>
      </form>}
    </div>
  )
}
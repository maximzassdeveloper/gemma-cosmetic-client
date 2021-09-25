import { FC, useState } from 'react'
import { IComment } from '../../types/product'
import { CommentItem } from './CommentItem'
import { CreateComment } from './CreateComment'

interface Props {
  comments: IComment[] | undefined
  productId: number
  changeComments?: (comments: IComment[]) => void
}

export const CommentList: FC<Props> = ({ comments: serverComments, productId, changeComments }) => {

  const [comments, setComments] = useState(serverComments || [])

  const onCreateComment = (com: IComment) => {
    setComments([com, ...comments])
    if (changeComments) changeComments([com, ...comments])
  }

  return (
    <div className="comments">
      <h2>Отзывы</h2>
      <div className="comments__flex">
        <div className="comments__list">
          {(!comments || !comments.length) && <p className="no-comments">Комментариев нет</p>}
          {!!comments && !!comments.length && comments.map(com => 
            <CommentItem key={com.id} comment={com} />
          )}
        </div>
        <CreateComment onCreate={c => onCreateComment(c)} productId={productId} />
      </div>
    </div>
  )
}
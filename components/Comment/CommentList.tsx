import { FC } from 'react'
import { IComment } from '../../types/product'
import { CommentItem } from './CommentItem'
import { CreateComment } from './CreateComment'

interface Props {
  comments: IComment[] | undefined
  productId: number
}

export const CommentList: FC<Props> = ({ comments, productId }) => {
  return (
    <div className="comments">
      <h2>Отзывы</h2>
      <div className="comments__flex">
        <div className="comments__list">
          {(!comments || !comments.length) && <p>Комментариев нет</p>}
          {!!comments && !!comments.length && comments.map(com => 
            <CommentItem key={com.id} comment={com} />
          )}
        </div>
        <CreateComment productId={productId} />
      </div>
    </div>
  )
}
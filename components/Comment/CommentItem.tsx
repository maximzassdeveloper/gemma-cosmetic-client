import { FC } from 'react'
import { IComment } from '../../types/product'
import { Rating } from '../Product'

interface CommentItemProps {
  comment: IComment
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="comment">

      <div className="comment__header">
        <h4>{comment.name}</h4>
        <Rating rating={comment.rating} />
      </div>

      <p className="comment__message">{comment.message}</p>

    </div>
  )
}
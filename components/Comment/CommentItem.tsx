import { FC, useState } from 'react'
import Link from 'next/link'
import { IComment } from '../../types/product'
import { Rating } from '../Product'
import { ImagePopup } from '../'
import { Image } from '../generetic'

interface CommentItemProps {
  comment: IComment
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {

  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  const openHandler = (index: number) => {
    setVisible(true)
    setActive(index)
  }

  return (
    <div className="comment">

      <ImagePopup 
        files={comment.files} 
        visible={visible} 
        active={active}
        onClose={() => setVisible(false)}
      />

      <div className="comment__header">
        <div className="comment__name">
          <h4>{comment.name}</h4>
          <Rating rating={comment.rating} />
        </div>
        {comment.product && <div className="comment__product">
          <Link href={`/product/${comment.product.slug}`}>{comment.product.name}</Link>
        </div>}
      </div>

      <p className="comment__message">{comment.message}</p>

      {<div className="comment__images">
        {comment.files?.map((file, index) => 
          <div 
            key={file.id}
            onClick={() => openHandler(index)} 
            className={file.type === 'image' ? 'comment__image' : 'comment__video'}
          >
            <Image file={file} />
          </div>
        )}
      </div>}

    </div>
  )
}
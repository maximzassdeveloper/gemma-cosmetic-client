import { FC, useState } from 'react'
import { IComment } from '../../types/product'
import { Rating } from '../Product'
import { ImagePopup } from '../'

interface CommentItemProps {
  comment: IComment
}

export const CommentItem: FC<CommentItemProps> = ({ comment }) => {

  const [active, setActive] = useState(false)
  const [cur, setCur] = useState(0)

  const openHandler = (index: number) => {
    setCur(index)
    setActive(true)
  }

  return (
    <div className="comment">

      <ImagePopup 
        files={[...comment.images, ...comment.videos]} 
        active={active} 
        cur={cur}
        onClose={() => setActive(false)}
      />

      <div className="comment__header">
        <h4>{comment.name}</h4>
        <Rating rating={comment.rating} />
      </div>

      <p className="comment__message">{comment.message}</p>

      {/* <div className="comment__images">
        {[...comment.images || [], ...comment.videos || []].map((i, index) =>
          <div onClick={() => openHandler(index)} key={index+i} className="comment__image">
            <img src={i} alt='' />
          </div>
        )}
      </div> */}

      {<div className="comment__images">
        {comment.images.map((i, index) =>
          <div onClick={() => openHandler(index)} key={index+i} className="comment__image">
            <img src={i} alt='' />
          </div>
        )}
        {comment.videos.map((i, index) =>
          <div onClick={() => openHandler(comment.images.length+index)} key={index+i} className="comment__video">
            <video key={index+i} src={i} controlsList="nodownload"></video>
          </div>
        )}
      </div>}

    </div>
  )
}
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { FC } from 'react'
import { X } from 'react-feather'
import { CSSTransition } from 'react-transition-group'
import { IFile } from '../types/product'
import { Image } from './generetic'

interface ImagePopupProps {
  files: string[] | IFile[]
  active: number
  visible: boolean
  onClose?: () => void
}

export const ImagePopup: FC<ImagePopupProps> = ({ files, active, visible, onClose }) => {
  return (
    <CSSTransition in={visible} timeout={200} classNames="fade" mountOnEnter unmountOnExit>
      <div className="image-popup">

        <div onClick={onClose} className="image-popup__back"></div>     
        <X onClick={onClose} className="image-popup__close" />

        <Splide
          className="image-popup__content"
          options={{
            perPage: 1,
            perMove: 1,
            start: active,
            focus: 'center'
          }}
        >
          {files.map((file, index) => 
            <SplideSlide key={index}>
              <Image file={file} controls />
            </SplideSlide>
          )}
        </Splide>

      </div>
    </CSSTransition>
  )
}
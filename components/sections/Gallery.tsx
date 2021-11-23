import { FC, useState, ReactNode, useEffect } from 'react'
import { SplideSlide } from '@splidejs/react-splide'
import { ImagePopup } from '..'
import { SliderSection } from '.'

interface GalleryProps {
  images?: string[]
  title?: ReactNode
}

const defImages = Array.apply(null, { length: 12 }).map((_,i) => `rewards/reward${i+1}.png`)

export const Gallery: FC<GalleryProps> = ({ images = defImages, title }) => {

  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  const selectHandler = (index: number) => {
    setActive(index)
    setVisible(true)
  }

  return <>
    <ImagePopup 
      visible={visible} 
      files={images}
      active={active}
      onClose={() => setVisible(false)}
    />
    <SliderSection 
      className="gallery" 
      title={title} 
      count={3}
      breakpoints={{
        1000: { perPage: 2 },
        600: { perPage: 1 }
      }}
    >
      {images.map((image: string, ind: number) => 
        <SplideSlide key={image+ind}>
          <div onClick={() => selectHandler(ind)} className="gallery__item">
            <img src={image} alt=""/>
          </div>
        </SplideSlide>
      )}
    </SliderSection>
  </>
}
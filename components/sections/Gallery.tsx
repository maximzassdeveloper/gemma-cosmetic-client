import { FC, useState, ReactNode, useEffect } from 'react'
import { SplideSlide } from '@splidejs/react-splide'
import { ImagePopup } from '..'
import { SliderSection } from '.'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface GalleryProps {
  images?: string[]
  title?: ReactNode
}

const defImages = Array.apply(null, { length: 12 }).map((_,i) => `rewards/reward${i+1}.png`)

export const Gallery: FC<GalleryProps> = ({ images = defImages, title }) => {

  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(3)

  const max500 = useMediaQuery('(max-width: 500px)')
  const max700 = useMediaQuery('(max-width: 700px)')

  useEffect(() => {
    if (max500) setCount(1)
    else if (max700) setCount(2)
    else setCount(3)
  }, [max500, max700])

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
    <SliderSection className="gallery" title={title} count={count}>
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
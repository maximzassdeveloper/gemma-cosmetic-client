import { FC, useState } from 'react'
import { ArrowDown, ArrowUp } from 'react-feather'

interface Props {
  images: string[]
  alt?: string
}

interface ImageProps {
  url: string
  alt?: string
}

export const ProductImage: FC<ImageProps> = ({ url, alt }) => {
  return (
    <div className="single-product__image">
      <img src={url} alt={alt} />
    </div>
  )
}

export const SingleProductImages: FC<Props> = ({ images, alt }) => {

  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlideHandler = () => {
    if (activeSlide !== images.length-1) setActiveSlide(activeSlide+1)
  }

  const prevSlideHandler = () => {
    if (activeSlide !== 0) setActiveSlide(activeSlide-1)
  }

  return (
    <div className="single-product__images">
      {images.length === 1 
        ? <ProductImage url={images[0]} alt={alt} />
        : <ProductImage url={images[activeSlide]} alt={alt} />
      }
      {images.length > 1 && <div className="single-product__arrows">
        <div onClick={prevSlideHandler} className="arrow rgih"><ArrowUp /></div>
        <div onClick={nextSlideHandler} className="arrow right"><ArrowDown /></div>
      </div>}
    </div>
  )
}
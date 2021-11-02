import { FC, ReactNode, useEffect, useState } from 'react'
import { SplideSlide } from '@splidejs/react-splide'
import { SliderSection } from '.'
import { Product } from '..'
import { IProduct } from '../../types/product'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface ProductSectionProps {
  products: IProduct[]
  title?: ReactNode,
}

export const ProductSection: FC<ProductSectionProps> = ({ products, title }) => {

  if (!products || !products.length) return null

  const [count, setCount] = useState(5)
  
  const max1250 = useMediaQuery('(max-width: 1250px)')
  const max950 = useMediaQuery('(max-width: 950px)')
  const max700 = useMediaQuery('(max-width: 700px)')

  useEffect(() => {
    if (max700) return setCount(2)
    else if (max950) return setCount(3)
    else if (max1250) return setCount(4)
    else setCount(5)
  }, [max1250, max950, max700])

  return (
    <SliderSection className="product-section products" title={title} count={count}>
      {products.map(product => 
        <SplideSlide key={product.id}>
          <Product product={product} />
        </SplideSlide>
      )}
    </SliderSection>
  )
}
import { FC, ReactNode } from 'react'
import { SplideSlide } from '@splidejs/react-splide'
import { SliderSection } from '.'
import { Product } from '..'
import { IProduct } from '../../types/product'

interface ProductSectionProps {
  products: IProduct[]
  title?: ReactNode,
}

export const ProductSection: FC<ProductSectionProps> = ({ products, title }) => {
  
  if (!products || !products.length) return null
  
  return (
    <SliderSection 
      className="product-section products" 
      title={title} 
      count={5}
      breakpoints={{
        1250: { perPage: 4 },
        950: { perPage: 3 },
        700: { perPage: 2 }
      }}
    >
      {products.map(product => 
        <SplideSlide key={product.id}>
          <Product product={product} />
        </SplideSlide>
      )}
    </SliderSection>
  )
}
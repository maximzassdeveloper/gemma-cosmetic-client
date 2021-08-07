import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

import { IProduct } from '../../types/product'
import { Price, AddToCart } from '.'

interface ProductProps {
  product: IProduct
}

export const Product: FC<ProductProps> = observer(({ product }) => {
  return (
    <div className="product">
      
      <div className="product__image">
        <Link href={`/product/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} />
        </Link>
      </div>

      <div className="product__content">
        <Link href={`/product/${product.slug}`}>
          <h3 className="product__name">{product.name}</h3>
        </Link>
        <Price className="product__price" price={product.price} />
        <AddToCart className="product__add" product={product} />
      </div>
      
    </div>
  )
})
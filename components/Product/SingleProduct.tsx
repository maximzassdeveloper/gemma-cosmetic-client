import { FC } from 'react'
import { IProduct } from '../../types/product'
import { Price, AddToCart } from '.'
import { observer } from 'mobx-react-lite'

interface SingleProductProps {
  product: IProduct
}

export const SingleProduct: FC<SingleProductProps> = observer(({ product }) => {
  return (
    <div className="single-product">

      <div className="single-product__info">
        <div className="single-product__rating"></div>

        <h1>{product.name}</h1>
        <Price className="single-product__price" price={product.price} />
        <AddToCart className="single-product__add" product={product} />
        <p className="single-product__short-desc">{product.shortDesc}</p>
      </div>

      <div className="single-product__images">
        {
          product.images.length === 1
            ? <img src={product.images[0]} alt={product.name} />
            : <div className="single-product__slider">
              {product.images.map(img => 
                <img src={img} alt={product.name} />
              )}
            </div>
        }
      </div>

    </div>
  )
})
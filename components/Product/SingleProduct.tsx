import { FC } from 'react'
import { IProduct } from '../../types/product'
import { Price, AddToCart } from '.'
import { observer } from 'mobx-react-lite'
import { CommentList } from '../Comment/CommentList'
import { Rating } from './Rating'

interface SingleProductProps {
  product: IProduct
}

export const SingleProduct: FC<SingleProductProps> = observer(({ product }) => {

  const calcRating = (): number => {
    if (!product.comments) return 0

    const rate = product.comments.reduce((t, i) => t + i.rating, 0)
    return Math.floor(rate / product.comments.length)
  }

  return (
    <div className="single-product__wrapper">
      <div className="single-product">

        <div className="single-product__info">
          <Rating className="single-product__rating" rating={calcRating()} />

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
      <CommentList productId={product.id} comments={product.comments} />
    </div>
  )
})
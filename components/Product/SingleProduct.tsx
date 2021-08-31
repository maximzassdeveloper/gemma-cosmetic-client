import { FC } from 'react'
import { IProduct } from '../../types/product'
import { Price, AddToCart } from '.'
import { CommentList } from '../Comment/CommentList'
import { Rating } from './Rating'
import { SingleProductImages } from './SingleProductImages'

interface SingleProductProps {
  product: IProduct
}

export const SingleProduct: FC<SingleProductProps> = ({ product }) => {

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

        <SingleProductImages images={product.images} alt={product.name} />

      </div>
      <CommentList productId={product.id} comments={product.comments} />
    </div>
  )
}
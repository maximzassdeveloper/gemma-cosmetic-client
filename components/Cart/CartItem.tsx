import { FC } from 'react'
import { X } from 'react-feather'
import Link from 'next/link'
import { useActions } from '../../hooks/useActions'
import { ICartProduct } from '../../types/cart'
import { ChangeCount, Price } from '../Product'

interface CartItemProps {
  product: ICartProduct
}

export const CartItem: FC<CartItemProps> = ({ product }) => {

  const { updateCartProduct, deleteCartProduct } = useActions()

  const changeCount = (count: number) => {
    updateCartProduct(product.slug, count)
  }

  const deleteHandler = () => {
    deleteCartProduct(product.id)
  }

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <Link href={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className="cart-item__name">
        <Link href={`/product/${product.slug}`}>{product.name}</Link>
        <X 
          className="cart-item__delete" 
          onClick={deleteHandler}
        />
      </div>
      <div className="cart-item__price">
        <Price price={product.totalPrice} />
        <ChangeCount 
          className="cart-item__count"
          onChange={c => changeCount(c)} 
          startCount={product.count} 
        />
      </div>
    </div>
  )
}
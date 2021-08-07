import { FC } from 'react'
import { Price } from '../Product/Price'

interface CartCheckoutProps {
  total: number
}

export const CartCheckout: FC<CartCheckoutProps> = ({ total }) => {
  return (
    <div className="cart-checkout">

      <div className="cart-checkout__table">
        <div className="cart-checkout__item">
          <h4>Сумма заказа</h4>
          <Price price={total} />
        </div>
      </div>

      <button
        className="cart-checkout__button"
      >
        Оформить заказ
      </button>

    </div>
  )
}
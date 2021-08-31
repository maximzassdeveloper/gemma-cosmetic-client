import { FC } from 'react'
import { useRouter } from 'next/router'
import { Price } from '../Product/Price'

interface CartCheckoutProps {
  total: number
  count: number
}

export const CartCheckout: FC<CartCheckoutProps> = ({ total, count }) => {

  const router = useRouter()

  const checkoutHandler = () => {
    if (count > 1) router.push('/checkout')
  }

  return (
    <div className="cart-checkout">

      <div className="cart-checkout__table">
        <div className="cart-checkout__item">
          <h4>Сумма заказа</h4>
          <Price price={total} />
        </div>
      </div>

      <button onClick={checkoutHandler} className="cart-checkout__button">Оформить заказ</button>

    </div>
  )
}
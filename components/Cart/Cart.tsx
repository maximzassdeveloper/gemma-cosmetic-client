import { FC, useEffect } from 'react'
import { X } from 'react-feather'
import classnames from '../../utils/classnames'

import { CartItem } from './CartItem'
import { CartCheckout } from './CartCheckout'
import { useActions } from '../../hooks/useActions'
import { useTypesSelector } from '../../hooks/useTypedSelector'

export const Cart: FC = () => {

  const { getCart, setActiveCart } = useActions()
  const { total, active, count, products } = useTypesSelector(state => state.cart)
  const { isAuth } = useTypesSelector(state => state.user)

  useEffect(() => {
    getCart()
  }, [isAuth])

  useEffect(() => {
    if (!active) return

    function cartOverClick(e) {
      if (!e.target.closest('.cart') && !e.target.closest('.add-to-cart')) {
        setActiveCart(false)
      }
    }

    window.addEventListener('click', cartOverClick)
    return () => {
      window.removeEventListener('click', cartOverClick)
    }

  }, [active])

  return (
    <div className={classnames('cart', { 'active': active })}>

      <div className="cart__header">
        <h3>Корзина</h3>
        <X 
          className="cart__close" 
          onClick={() => setActiveCart(false)}
        />
      </div>

      <div className="cart__items">
        {!count && <p>Корзина пустая</p>}
        {!!count && (
          products.map(item =>
            <CartItem key={item.id} product={item} />
          )
        )}
      </div>

      <CartCheckout count={count} total={total} />

    </div>
  )
}
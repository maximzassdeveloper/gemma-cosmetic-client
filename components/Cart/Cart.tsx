import { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { X } from 'react-feather'
import classnames from 'classnames'

import { useStores } from '../../store'
import { CartItem } from './CartItem'
import { CartCheckout } from './CartCheckout'

export const Cart: FC = observer(() => {

  const { cartStore, userStore } = useStores()

  const calcTotalPrice = (): number => {
    return cartStore.products.reduce((total, x) => total + x.totalPrice, 0)
  }

  useEffect(() => {
    cartStore.getCart()
  }, [userStore.isAuth])

  return (
    <div className={classnames('cart', { 'active': cartStore.active })}>

      <div className="cart__header">
        <h3>Корзина</h3>
        <X 
          className="cart__close" 
          onClick={() => cartStore.setActive(false)}
        />
      </div>

      <div className="cart__items">
        {!cartStore.count && <p>Корзина пустая</p>}
        {!!cartStore.count && (
          cartStore.products.map(item =>
            <CartItem key={item.id} product={item} />
          )
        )}
      </div>

      <CartCheckout total={calcTotalPrice()} />

    </div>
  )
})
import { FC, useState, useEffect, memo } from 'react'
import { X } from 'react-feather'
import classnames from '../../utils/classnames'

import { CartItem } from './CartItem'
import { CartCheckout } from './CartCheckout'
import { CartOffer } from './CartOffer'
import { useActions } from '../../hooks/useActions'
import { useTypesSelector } from '../../hooks/useTypedSelector'
import { getRandomFromArray } from '../../utils/helper'

export const Cart: FC = memo(() => {

  const { getCart, setActiveCart, getProducts } = useActions()
  const { total, active, count, products } = useTypesSelector(state => state.cart)
  const { products: pproducts } = useTypesSelector(state => state.product)
  const { isAuth } = useTypesSelector(state => state.user)
  const [offetProducts, setOfferProducts] = useState([])

  useEffect(() => {
    getCart()
  }, [isAuth])

  useEffect(() => {
    getProducts()
  }, [])
  
  useEffect(() => {
    if (pproducts?.length) {
      const arr = pproducts.filter(pr => {
        let bool = true
        products.forEach(x => x.slug === pr.slug ? bool =  false : null)
        return bool
      })
      setOfferProducts(getRandomFromArray(arr, 3))
    }
  }, [pproducts, products])

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
    <div className={classnames('cart', { 'active': active, 'cart--offer': !!offetProducts.length })}>

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

      <CartOffer products={offetProducts} />

      <CartCheckout count={count} total={total} />

    </div>
  )
})
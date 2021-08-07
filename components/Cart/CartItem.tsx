import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { X } from 'react-feather'
import { useStores } from '../../store'
import { ICartProduct } from '../../types/product'
import { ChangeCount, Price } from '../Product'

interface CartItemProps {
  product: ICartProduct
}

export const CartItem: FC<CartItemProps> = observer(({ product }) => {

  const { cartStore } = useStores()

  const changeCount = (count: number) => {
    cartStore.updateProduct(product.id, count)
  }

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={product.image} alt="" />
      </div>
      <div className="cart-item__name">
        {product.name}
        <X 
          className="cart-item__delete" 
          onClick={() => cartStore.deleteProduct(product.id)}
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
})
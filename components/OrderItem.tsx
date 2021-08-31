import { FC, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { useTransition, animated } from '@react-spring/web'
import { ChevronDown } from 'react-feather'
import { IOrder } from '../types/order'
import { Price } from './Product'

interface OrderItemProps {
  order: IOrder
}

export const OrderItem: FC<OrderItemProps> = ({ order }) => {

  const [toggle, setToggle] = useState(false)

  return (
    <div className="order-list__item item">

      <div className="item__header">
        <h4>{order.user.phone}</h4>
        <div className="item__status">{order.status}</div>
        <div onClick={() => setToggle(!toggle)} className="item__toggle"><ChevronDown /></div>
      </div>

      {toggle && <div className="item__products">
        {order.order_products.map(product => 
          <div key={product.id} className="product-line">
            <div className="product-line__image">
              <img src={product.image} alt={product.name} />
            </div>
            <h4 className="product-line__name">{product.name}</h4>
            <div className="product-line__count">{product.count}</div>
            <Price className="product-line__price" price={product.totalPrice} />
          </div>
        )}
      </div>}

    </div>
  )
}
import { FC, useEffect, useState } from 'react'
import { useTypesSelector } from '../hooks/useTypedSelector'
import authAxios from '../services/axiosService'
import { IOrder } from '../types/order'
import { OrderItem } from './OrderItem'

export const OrderList: FC = () => {

  const { user, isAuth } = useTypesSelector(({ user }) => user)
  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    const getOrders = async () => {
      if (user && user.id) {
        const { data } = await authAxios.get(`/orders/?user=${user.id}`)
        setOrders(data)
      } else {
        const { data } = await authAxios.get(`/orders`)
        setOrders(data)
      }
    }
    getOrders()
  }, [isAuth])

  return (
    <div className="order-list">
      <div className="order-list__header">
        <p className="phone">Телефон</p>
        <p className="status">Статус</p>
        <p className="toggle"></p>
      </div>
      {orders.map(order => 
        <OrderItem key={order.id} order={order} />
      )}
    </div>
  )
}
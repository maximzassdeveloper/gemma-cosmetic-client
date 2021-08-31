import { IUser } from './user'

export type OrderStatus = 'Товар собирается' | 'Товар доставляется' | 'Товар доставлен'

export interface IOrder {
  id: number
  status: OrderStatus
  comment?: string
  userId: number
  order_products: IOrderProduct[]
  user: IUser
}

export interface IOrderProduct {
  id: number
  name: string
  slug: string
  price: number
  totalPrice: number
  count: number
  image: string
  orderId: number
}
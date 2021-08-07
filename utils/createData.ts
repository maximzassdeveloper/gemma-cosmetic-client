import { ICartProduct, IProduct } from '../types/product'

export const createCartProduct = (product: IProduct, count: number): ICartProduct => {
  const cartProduct = {} as ICartProduct
  cartProduct.id = product.id
  cartProduct.name = product.name
  cartProduct.slug = product.slug
  cartProduct.price = product.price
  cartProduct.image = product.images[0]
  cartProduct.count = count
  cartProduct.totalPrice = count * product.price

  return cartProduct
}
import { ICartProduct, IProduct } from '../types/product'
import { IRegisterData, ILoginData } from '../types/user'

export class RegisterDto implements IRegisterData {
  name: string = ''
  surname: string = ''
  email: string = ''
  password: string = ''

  constructor(data: { [name: string]: string }) {
    this.name = data.name
    this.surname = data.surname
    this.email = data.email
    this.password = data.password
  }
}
export class LoginDto implements ILoginData {
  email: string = ''
  password: string = ''

  constructor(data: { [name: string]: string }) {
    this.email = data.email
    this.password = data.password
  }
}

export class CartProductDto implements ICartProduct {
  id: number = 0
  name: string = ''
  slug: string = ''
  price: number = 0
  totalPrice: number = 0
  count: number = 0
  img: string = ''
  
  constructor(product: IProduct, count: number) {
    this.id = product.id
    this.name = product.name
    this.slug = product.slug
    this.price = product.price
    this.count = count
    this.totalPrice = product.price * count
    // this.img = product.images[0]
  }
}
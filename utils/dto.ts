import { IProduct } from '../types/product'
import { ICartProduct } from '../types/cart'
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
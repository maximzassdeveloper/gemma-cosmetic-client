import { makeAutoObservable } from 'mobx'
import { addCartProduct, deleteCartProduct, updateCartProduct, getCart } from '../services/cartService'
import { ICartProduct } from '../types/product'

export class CartStore {
  total: number = 0
  count: number = 0
  products: ICartProduct[] = []
  active: boolean = false
  loading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setActive(toggle: boolean) {
    this.active = toggle
  }

  setProducts(products: ICartProduct[]) {
    let count = 0
    let total = 0

    products.forEach(i => {
      count += i.count
      total += i.totalPrice
    })

    this.products = products 
    this.count = count
    this.total = total
  }

  async getCart() {
    this.loading = true
    getCart()
      .then(({ data }) => this.setProducts(data.products))
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
  }

  async addProduct(product: ICartProduct) {
    this.loading = true
    addCartProduct(product)
      .then(({ data }) => this.setProducts(data.products))
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
  }

  async deleteProduct(id: number) {
    this.loading = true
    deleteCartProduct(id)
      .then(({ data }) => this.setProducts(data.products))
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
  }

  async updateProduct(id: number, count: number) {
    this.loading = true
    updateCartProduct(id, count)
      .then(({ data }) => {
        const prIndex = this.products.findIndex(x => x.id === data.product.id)
        this.products[prIndex] = data.product
        this.setProducts(this.products)
      })
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
  }
}
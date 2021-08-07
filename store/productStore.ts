import { makeAutoObservable } from 'mobx'
import { getProducts, getProduct } from '../services/productService'
import { IProduct } from '../types/product'

export class ProductStore {
  products: IProduct[] = []
  product: IProduct | null = null
  loading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  async getProducts() {
    this.loading = true
    getProducts()
      .then(({ data }) => {
        this.products = data.products
      })
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
  }

  async getProduct(slug: string) {
    this.loading = true
    this.product = null
    getProduct(slug)
      .then(({ data }) => this.product = data.product)
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
  }
}
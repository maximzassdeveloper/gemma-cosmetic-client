import { AxiosResponse } from 'axios'
import { IProduct } from '../types/product'
import authAxios from './axiosService'


interface ProductsResponse {
  products: IProduct[]
}

export const getProducts = async (): Promise<AxiosResponse<ProductsResponse>> => {
  return authAxios.get<ProductsResponse>('/products')
}

interface ProductResponse {
  product: IProduct
}

export const getProduct = async (slug: string): Promise<AxiosResponse<ProductResponse>> => {
  return authAxios.get<ProductResponse>(`/products/product/${slug}`)
}
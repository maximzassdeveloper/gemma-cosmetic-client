import { AxiosResponse } from 'axios'
import { ICartProduct } from '../types/product'
import authAxios from './axiosService'

interface ICartResponse {
  products: ICartProduct[]
}

export const getCart = async (): Promise<AxiosResponse<ICartResponse>> => {
  return authAxios.get<ICartResponse>('/cart',)
}

export const addCartProduct = async (product: ICartProduct): Promise<AxiosResponse<ICartResponse>> => {
  return authAxios.post<ICartResponse>('/cart/add', {...product})
}

export const deleteCartProduct = async (id: number): Promise<AxiosResponse<ICartResponse>> => {
  return authAxios.delete<ICartResponse>(`/cart/delete/${id}`)
}

interface IUpdateResponse {
  product: ICartProduct
}

export const updateCartProduct = async (id: number, count: number): Promise<AxiosResponse<IUpdateResponse>> => {
  return authAxios.put<IUpdateResponse>(`/cart/update/${id}`, { count })
}

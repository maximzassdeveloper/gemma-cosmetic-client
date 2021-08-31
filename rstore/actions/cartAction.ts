import { Dispatch } from 'react'
import authAxios from '../../services/axiosService'
import { CartAction, CartActionTypes, ICartProduct } from '../../types/cart'

export const getCart = () => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      const { data } = await authAxios.get('/cart')
      dispatch({ type: CartActionTypes.GET_CART, payload: data })
    } catch {}
  }
}

export const addCartProduct = (product: ICartProduct) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      const { data } = await authAxios.post('/cart/add', {...product})
      dispatch({ type: CartActionTypes.ADD_PRODUCT, payload: data })
    } catch {}
  }
}

export const deleteCartProduct = (id: number) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      await authAxios.delete(`/cart/delete/${id}`)
      dispatch({ type: CartActionTypes.DELETE_PRODUCT, payload: id })
    } catch {}
  }
}

export const updateCartProduct = (slug: string, count: number) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      await authAxios.put(`/cart/update/${slug}`, { count })
      dispatch({ type: CartActionTypes.UPDATE_COUNT, payload: { slug, count } })
    } catch {}
  }
}

export const setActiveCart = (active: boolean) => {
  return (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.SET_ACTIVE, payload: active })
  }
}

export const clearCart = () => {
  return (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.CLEAR_CART })
  }
}
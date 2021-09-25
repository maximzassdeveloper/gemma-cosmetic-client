import { Dispatch } from 'react'
import { ProductAction, ProductActionTypes } from '../../types/product'
import axios from 'axios'
import authAxios from '../../services/axiosService'
import { SERVER_URL } from '../../utils/config'

export const getProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({type: ProductActionTypes.GET_PRODUCTS})

      const { data } = await axios.get(`${SERVER_URL}/api/products`)
      dispatch({ type: ProductActionTypes.GET_PRODUCTS_SUCCESS, payload: data })

    } catch {
      dispatch({
        type: ProductActionTypes.GET_PRODUCTS_ERROR,
        payload: 'Товары не были загружены, произошла ошибка'
      })
    }
  }
}

export const deleteProduct = (id: number) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      await authAxios.delete(`${SERVER_URL}/api/products/delete/${id}`)
      dispatch({
        type: ProductActionTypes.DELETE_PRODUCT,
        payload: id
      })
    } catch {

    }
  }
}

export const getCategories = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({type: ProductActionTypes.GET_CATS})

      const { data } = await axios.get(`${SERVER_URL}/api/categories`)
      dispatch({ type: ProductActionTypes.GET_CATS_SUCCESS, payload: data })

    } catch {
      dispatch({
        type: ProductActionTypes.GET_CATS_ERROR,
        payload: 'Категории не были загружены, произошла ошибка'
      })
    }
  }
}

export const addCategory = (name: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const { data } = await authAxios.post(
        `${SERVER_URL}/api/categories/create`,
        { name }
      )
      dispatch({
        type: ProductActionTypes.ADD_CATEGORY,
        payload: data
      })
    } catch(e) {
      dispatch({
        type: ProductActionTypes.ADD_CATEGORY,
        payload: null
      })
    }
  }
}
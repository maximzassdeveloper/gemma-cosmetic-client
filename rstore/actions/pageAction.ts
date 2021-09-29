import { Dispatch } from 'react'
import authAxios from '../../services/axiosService'
import { PageAction, PageActionTypes } from '../../types/page'

export const getPages = () => {
  return async (dispatch: Dispatch<PageAction>) => {
    try {
      const { data } = await authAxios.get('/pages')
      dispatch({ type: PageActionTypes.GET_PAGES, payload: data })
    } catch(e) {
      console.log(e)
    }
  }
}
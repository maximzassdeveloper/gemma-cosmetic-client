import { Dispatch } from 'react'
import authAxios from '../../services/axiosService'
import { HelpAction, HelpActionTypes } from '../../types/help'

export const getPages = () => {
  return async (dispatch: Dispatch<HelpAction>) => {
    try {
      const { data } = await authAxios.get('/pages')
      dispatch({ type: HelpActionTypes.GET_PAGES, payload: data })
    } catch(e) {
      console.log(e)
    }
  }
}

export const setCallToAction = (active: boolean) => {
  return async (dispatch: Dispatch<HelpAction>) => {
    dispatch({ type: HelpActionTypes.SET_CALL_TO_ACTION, payload: active })
  }
}
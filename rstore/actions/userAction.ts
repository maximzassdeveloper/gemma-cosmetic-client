import { Dispatch } from 'react'
import authAxios from '../../services/axiosService'
import { ILoginData, IRegisterData, UserAction, UserActionsTypes } from '../../types/user'

export const register = (registerData: IRegisterData) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionsTypes.REGISTER })

      const { data } = await authAxios.post('/users/register', registerData)
      localStorage.setItem('costoken', data.accessToken)
      dispatch({ type: UserActionsTypes.REGISTER_SUCCESS, payload: data })

    } catch {
      dispatch({ type: UserActionsTypes.REGISTER_ERROR, payload: 'Регистрация не удалась' })
    }
  }
}

export const login = (loginData: ILoginData) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionsTypes.LOGIN })

      const { data } = await authAxios.post('/users/login', loginData)
      localStorage.setItem('costoken', data.accessToken)
      dispatch({ type: UserActionsTypes.LOGIN_SUCCESS, payload: data })
      
    } catch {
      dispatch({ type: UserActionsTypes.LOGIN_ERROR, payload: 'Некорректные данные' })
    }
  }
}

export const cleanError = () => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionsTypes.CLEAN_ERROR})
  }
}

export const refresh = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const { data } = await authAxios.get('/users/refresh')
      localStorage.setItem('costoken', data.accessToken)
      dispatch({ type: UserActionsTypes.REFRESH, payload: data })   
    } catch {}
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await authAxios.get('/users/logout')
      localStorage.removeItem('costoken')
      dispatch({ type: UserActionsTypes.LOGOUT })
    } catch {}
  }
}
import { AxiosResponse } from 'axios'
import { AuthResponse, ILoginData, IRegisterData } from '../types/user'
import authAxios from './axiosService'

export const register = async (data: IRegisterData): Promise<AxiosResponse<AuthResponse>> => {
  return authAxios.post<AuthResponse>('/users/register', {...data})
}

export const login = async (data: ILoginData): Promise<AxiosResponse<AuthResponse>> => {
  return authAxios.post<AuthResponse>('/users/login', {...data})
}

export const logout = async (): Promise<AxiosResponse> => {
  return authAxios.get('/users/logout')
}

export const refresh = async (): Promise<AxiosResponse<AuthResponse>> => {
  return authAxios.get<AuthResponse>('/users/refresh')
}
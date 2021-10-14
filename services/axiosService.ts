import axios from 'axios'

export const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`

const authAxios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

authAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('costoken') || ''}`
  return config
})

export default authAxios

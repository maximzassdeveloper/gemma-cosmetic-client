import axios from 'axios'
import { SERVER_URL } from '../utils/config'

export const BASE_URL = `${SERVER_URL}/api`

const authAxios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

authAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('costoken') || ''}`
  return config
})

export default authAxios

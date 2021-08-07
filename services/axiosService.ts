import axios from 'axios'

export const BASE_URL = 'http://localhost:5000/api'

const authAxios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
})

authAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('costoken') || ''}`
  return config
})

export default authAxios
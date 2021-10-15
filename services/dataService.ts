import axios from 'axios'
import { SERVER_URL } from '../utils/config'

export const fetchData = async (url: string) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api${url}`, { withCredentials: true })
    return data
  } catch {
    return null
  }
}
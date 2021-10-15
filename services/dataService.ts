import axios from 'axios'

export const fetchData = async (url: string) => {
  try {
    const { data } = await axios.get(`https://server.gemmainrussia.ru/api${url}`, { withCredentials: true })
    return data
  } catch {
    return null
  }
}
import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { StoreProvider, useStores } from '../store'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {

  const { userStore } = useStores()

  useEffect(() => {
    const token = localStorage.getItem('costoken')
    if (token) {
      userStore.refresh()
    }
  }, [])

  return <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
}

export default MyApp
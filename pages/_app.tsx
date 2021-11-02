import { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../rstore'
import { useActions } from '../hooks/useActions'
import '../styles/global.scss'
import '@splidejs/splide/dist/css/splide.min.css'

const ComponentForRefresh: FC = () => {

  const { refresh } = useActions()

  useEffect(() => {
    const token = localStorage.getItem('costoken')
    if (token) {
      refresh()
    }
  }, [])

  return <></>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ComponentForRefresh />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
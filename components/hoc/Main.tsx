import { FC } from 'react'
import Head from 'next/head'
import { Header, Footer } from '..'
import { useTypesSelector } from '../../hooks/useTypedSelector'

interface MainProps {
  authRequierd?: boolean
  title?: string
  description?: string
  robots?: string
  keywords?: string
}

export const Main: FC<MainProps> = ({ children, authRequierd, title, description, robots, keywords }) => {

  const { isAuth } = useTypesSelector(state => state.user)

  return (
    <div className="wrapper">

      <Head>
        <title>{title ? `${title} - Gemma Cosmetic Russia` : 'Gemma Cosmetic Russia'}</title>
        <meta name='description' content={description || 'Высококачественная продукция GEMMA KOREA премиум-класса прямо из Южной Кореи'} />
        <meta name='robots' content={robots || 'index, follow'} />
        <meta name='keywords' content={keywords || 'Продукция из Южной Кореи, Полезные товары'} />
      </Head>

      <Header />
      <main className="main">
        {authRequierd 
          ? isAuth ? children : <p>Недостаточно прав</p>
          : children
        }
      </main>
      <Footer />
    </div>
  )
}
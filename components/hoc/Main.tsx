import { FC } from 'react'
import Head from 'next/head'
import { Header, Footer } from '..'
import { useTypesSelector } from '../../hooks/useTypedSelector'
import classnames from '../../utils/classnames'

interface MainProps {
  authRequierd?: boolean
  title?: string
  className?: string
  description?: string
  robots?: string
  keywords?: string
}

export const Main: FC<MainProps> = ({ 
  children, authRequierd, className, title, description, robots, keywords 
}) => {

  const { isAuth } = useTypesSelector(state => state.user)

  return (
    <div className={classnames(
      'wrapper', 
      className ? `wrapper-${className}` : ''
    )}>

      <Head>
        <title>{title ? `${title} - Gemma Cosmetic Russia` : 'Gemma Cosmetic Russia'}</title>
        <meta name='description' content={description || 'Высококачественная продукция GEMMA KOREA премиум-класса прямо из Южной Кореи'} />
        <meta name='robots' content={robots || 'index, follow'} />
        <meta name='keywords' content={keywords || 'Продукция из Южной Кореи, Полезные товары'} />
      </Head>

      <Header />
      <main className={classnames('main', className)}>
        {authRequierd 
          ? isAuth ? children : <p>Недостаточно прав</p>
          : children
        }
      </main>
      <Footer />
    </div>
  )
}
import { FC } from 'react'
import Head from 'next/head'
import { AdminFooter, AdminHeader, AdminSidebar } from '../admin'
import { AdminContainer } from './AdminContainer'
import { useTypesSelector } from '../../hooks/useTypedSelector'

export const AdminMain: FC = ({ children }) => {

  const { user } = useTypesSelector(state => state.user)

  return (
    <main className="admin">

      <Head>
        <title>Админ Панель Gemma Cosmetic Russia</title>
        <meta name='robots' content='noindex, nofollow' />
      </Head>

      {user.role === 'ADMIN'
        ? <>
          <AdminHeader />
          <div className="admin__wrapper">
            <AdminSidebar />
            <AdminContainer>
              {children}
            </AdminContainer>
          </div>
          <AdminFooter />
        </>
        : <p>Недостаточно прав</p>
      }

    </main>
  )
}
import { FC } from 'react'
import { AdminFooter, AdminHeader, AdminSidebar } from '../admin'
import { AdminContainer } from './AdminContainer'

export const AdminMain: FC = ({ children }) => {
  return (
    <main className="admin">
      <AdminHeader />
      <div className="admin__wrapper">
        <AdminSidebar />
        <AdminContainer>
          {children}
        </AdminContainer>
      </div>
      <AdminFooter />
    </main>
  )
}
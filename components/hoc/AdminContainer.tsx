import { FC } from 'react'

export const AdminContainer: FC = ({ children }) => {
  return (
    <div className="admin__container">
      {children}
    </div>
  )
}
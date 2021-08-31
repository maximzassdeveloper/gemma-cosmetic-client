import { FC } from 'react'
import Link from 'next/link'

export const AdminHeader: FC = () => {
  return (
    <div className="admin__header">
      <div className="logo"><Link href='/'>Admin Panel</Link></div>
    </div>
  )
}
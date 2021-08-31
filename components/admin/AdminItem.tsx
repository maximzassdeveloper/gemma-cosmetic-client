import { FC } from 'react'

interface AdminItemProps {
  item: any
}

export const AdminItem: FC<AdminItemProps> = ({ item, children }) => {
  return (
    <div className="admin__item item">
      <div className="item__id">{item.id}</div>
      <div className="item__name">{item.name}</div>
      {children}
      <div className="item__createAt">{item.createdAt}</div>
      <div className="item__createAt">{item.updatedAt}</div>
    </div>
  )
}
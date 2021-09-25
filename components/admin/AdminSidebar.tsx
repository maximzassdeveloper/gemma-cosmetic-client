import { FC } from 'react'
import { ActiveLink } from '..'

export const AdminSidebar: FC = () => {
  return (
    <div className="admin__sidebar admin-sidebar">
      <nav className="admin-sidebar__menu">
        <ul>
          <li><ActiveLink href='/admin'>Консоль</ActiveLink></li>
          <li><ActiveLink href='/admin/products'>Товары</ActiveLink></li>
          <li><ActiveLink href='/admin/products/create'>Создать товар</ActiveLink></li>
          <li><ActiveLink href='/admin/comments'>Комментарии</ActiveLink></li>
          <li><ActiveLink href='/admin/attributes'>Атрибуты</ActiveLink></li>
          <li><ActiveLink href='/admin/attributes/create'>Создать атрибут</ActiveLink></li>
          <li><ActiveLink href='/admin/categories'>Категории</ActiveLink></li>
          <li><ActiveLink href='/admin/pages'>Страницы</ActiveLink></li>
          <li><ActiveLink href='/admin/pages/create'>Создать страницу</ActiveLink></li>
        </ul>
      </nav>
    </div>
  )
}
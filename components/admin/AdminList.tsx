import { FC } from 'react'
import Link from 'next/link'
import classnames from '../../utils/classnames'

interface AdminListProps {
  options: { name: string, slug: string }[]
  items: any[]
  link: string
  linkOption: string
}

interface ListItemProps {
  tag?: 'th' | 'td'
  className?: string
  link?: string
}

const ListItem: FC<ListItemProps> = ({ tag = 'th', className, children, link }) => {
  const Tag = tag
  const classes = classnames(
    'column',
    className,
    { 'column-link': !!link },
    { 'column-none': !children }
  )

  return <>
    <Tag className={classes}>
      {!!link 
        ? <Link href={link}>{children ? children : '-'}</Link>
        : children ? children : '-'
      }
    </Tag>
  </>
}

export const AdminList: FC<AdminListProps> = ({ options, items, link, linkOption }) => {
  return (
    <div className="admin__list list">
      <table>

        <thead>
          <tr>
            {options.map(i => 
              <ListItem key={i.slug} className={`column-${i.slug}`}>
                {i.name}
              </ListItem>
            )}
            <th className="column column-date">Дата</th>
          </tr>
        </thead>

        <tbody>
          {items.map(i => 
            <tr key={i.id} className="row">
              {options.map(op => 
                <ListItem 
                  key={op.slug} 
                  className={`column-${op.slug}`}
                  link={op.slug === 'name' ? `${link}/${i[linkOption]}` : ''}
                >
                  {i[op.slug]}
                </ListItem>
              )}
              <ListItem tag='td' className="column-date">
                <p>Обновлено {new Date(i.updatedAt).toLocaleDateString()}</p>
                <p>Опубликовано {new Date(i.createdAt).toLocaleDateString()}</p>
              </ListItem>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  )
}
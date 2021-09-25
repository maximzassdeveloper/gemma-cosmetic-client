import { FC } from 'react'
import { useRouter } from 'next/router'
import { ICategory } from '../../types/product'

interface CategoryListProps {
  cats?: ICategory[]
}

export const CategoryList: FC<CategoryListProps> = ({ cats }) => {

  const router = useRouter()
  if (!cats || !cats.length) return null

  const linkHandler = (slug: string) => {
    router.push({ pathname: '/catalog', query: { cats: slug } })
  }

  return (
    <div className="single-product__categories">
      <h4>Категории:</h4>
      {cats.map(cat =>
        <span key={cat.id} onClick={() => linkHandler(cat.slug)}>
          {cat.name}
        </span>
      )}     
    </div>
  )
}
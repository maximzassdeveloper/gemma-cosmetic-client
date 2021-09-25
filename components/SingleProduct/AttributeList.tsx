import { FC } from 'react'
import { useRouter } from 'next/router'
import { IProductAttribute } from '../../types/product'

interface AttributeListProps {
  attrs?: IProductAttribute[]
}

export const AttributeList: FC<AttributeListProps> = ({ attrs }) => {

  const router = useRouter()
  if (!attrs || !attrs.length) return null

  const linkHandler = (slug: string) => {
    let query: any = {}
    query.attrs = slug
    router.push({ pathname: '/catalog', query })
  }

  return (
    <div className="single-product__attributes">
      <h4>Атрибуты:</h4>
      {attrs.map(attr => 
        <div key={attr.id} className="single-product__attribute attribute">
          <div>{attr.attribute.name}: 
            <span onClick={() => linkHandler(attr.slug)}>{attr.name}</span>
          </div>
        </div>
      )}
    </div>
  )
}
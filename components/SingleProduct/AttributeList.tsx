import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { IProductAttribute } from '../../types/product'

interface AttributeListProps {
  attrs?: IProductAttribute[]
}

interface AttributeItem {
  id: number
  name: string
  slug: string
  values: {
    id: number
    name: string
    slug: string
  }[]
}

export const AttributeList: FC<AttributeListProps> = ({ attrs }) => {

  const [attributes, setAttributes] = useState<AttributeItem[]>([])
  const router = useRouter()

  useEffect(() => {
    if (!attrs) return

    const newArr: AttributeItem[] = []
    attrs.forEach(attr => {
      const curIndex = newArr.findIndex(x => x.id === attr.attribute.id)
      if (curIndex >= 0) {
        const cur = newArr[curIndex]
        newArr[curIndex] = { 
          ...cur, 
          values: [...cur.values, { id: attr.id, name: attr.name, slug: attr.slug }] 
        }
      } else {
        newArr.push({ 
          id: attr.attribute.id,
          name: attr.attribute.name,
          slug: attr.attribute.slug,
          values: [{ id: attr.id, name: attr.name, slug: attr.slug }]
        })
      }
    })
    setAttributes(newArr)
  }, [attrs])

  if (!attrs || !attrs.length) return null

  const linkHandler = (slug: string) => {
    let query: any = {}
    query.attrs = slug
    router.push({ pathname: '/catalog', query })
  }

  return (
    <div className="single-product__attributes">
      <h4>Атрибуты:</h4>
      {attributes.map(attr => 
        <div key={attr.id} className="single-product__attribute attribute">
          <div>{attr.name}: 
            {attr.values.map((value, index) => 
              <span 
                key={value.id} 
                onClick={() => linkHandler(value.slug)}
              >
                {value.name}
                {attr.values.length-1 !== index ? ', ' : ''}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
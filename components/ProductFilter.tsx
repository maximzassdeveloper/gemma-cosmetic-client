import React, { FC, useState, useEffect } from 'react'
import { IAttribute, ICategory } from '../types/product'

interface ProductFilterProps {
  attributes: IAttribute[]
  categories: ICategory[]
  onChange?: (options: { cats: string[], attrs: string[] }) => void
}

interface ItemProps {
  name: string
}

export const ProductFilterItem: FC<ItemProps> = ({ children, name }) => {
  return (
    <div className="filter__item item">
      <div className="item__header">
        <h4>{name}</h4>
      </div>
      {children}
    </div>
  )
}

export const ProductFilter: FC<ProductFilterProps> = ({ attributes, categories, onChange }) => {

  const [attrs, setAttrs] = useState<string[]>([])
  const [cats, setCats] = useState<string[]>([])

  useEffect(() => {
    if (onChange) onChange({ attrs, cats })
  }, [attrs, cats])

  const addAttrHandler = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    if (attrs.includes(slug)) {
      setAttrs(attrs.filter(x => x !== slug))
      e.currentTarget.classList.remove('active')
    } else {
      setAttrs([...attrs, slug])
      e.currentTarget.classList.add('active')
    }
  }

  const addCatHandler = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    if (cats.includes(slug)) {
      setCats(cats.filter(x => x !== slug))
      e.currentTarget.classList.remove('active')
    } else {
      setCats([...cats, slug])
      e.currentTarget.classList.add('active')
    }
  }

  return (
    <div className="catalog__filter filter">
      <h3 className="filter__title">Фильтры</h3>

      <ProductFilterItem name='Категории'>
        {categories.map(cat => 
          <div 
            key={cat.id} 
            onClick={e => addCatHandler(e, cat.slug)}
            className="option">
            {cat.name}
          </div>
        )}
      </ProductFilterItem>

      {attributes.map(attr => 
        <ProductFilterItem key={attr.id} name={attr.name}>
          {attr.attribute_values.map(i => 
            <div 
              key={i.id} 
              onClick={e => addAttrHandler(e, i.slug)}
              className="option">
              {i.name}
            </div>
          )}
        </ProductFilterItem>
      )}

    </div>
  )
}
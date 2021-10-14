import React, { FC, useState, useEffect } from 'react'
import { IAttribute, ICategory } from '../../types/product'

interface ProductFilterProps {
  attributes: IAttribute[]
  categories: ICategory[]
  active?: { attrs?: [], cats?: [] }
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

export const ProductFilter: FC<ProductFilterProps> = ({ active, attributes, categories, onChange }) => {

  const [attrs, setAttrs] = useState<string[]>(active?.attrs || [])
  const [cats, setCats] = useState<string[]>(active?.cats || [])

  useEffect(() => {
    if (onChange) onChange({ attrs, cats })
  }, [attrs, cats])

  const addAttrHandler = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    if (attrs.includes(slug)) setAttrs(attrs.filter(x => x !== slug))
    else setAttrs([...attrs, slug])
  }

  const addCatHandler = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    if (cats.includes(slug)) setCats(cats.filter(x => x !== slug))
    else setCats([...cats, slug])
  }

  return (
    <div className="catalog__filter filter">
      <h3 className="filter__title">Фильтры</h3>

      <ProductFilterItem name='Категории'>
        {categories.map(cat => 
          <div 
            key={cat.id} 
            onClick={e => addCatHandler(e, cat.slug)}
            className={`option${cats.includes(cat.slug) ? ' active' : ''}`}>
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
              className={`option${attrs.includes(i.slug) ? ' active' : ''}`}>
              {i.name}
            </div>
          )}
        </ProductFilterItem>
      )}

    </div>
  )
}
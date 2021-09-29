import React, { FC, useState } from 'react'
import { Search } from 'react-feather'
import { IProduct } from '../types/product'
import { Input } from './generetic'

interface ProductSearchProps {
  products: IProduct[]
  onChange: (products: IProduct[]) => void
}

export const ProductSearch: FC<ProductSearchProps> = ({ products: iProducts, onChange }) => {

  const [products, setProducts] = useState(iProducts || [])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value

    if (!val.trim()) return onChange(products)

    const arr = products.filter(pr => pr.name.toLowerCase().includes(val.trim().toLocaleLowerCase()))
    onChange(arr)
  }

  return (
    <div className="product-search">
      <div className="product-search__input">
        <div className="product-search__icon">
          <Search />
        </div>
        <Input 
          name='product-search'
          onChange={changeHandler}
          placeholder='Введите название товара'
        />
      </div>
    </div>
  )
}
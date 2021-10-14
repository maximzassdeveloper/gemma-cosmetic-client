import { FC, useState } from 'react'
import { IProduct } from '../../types/product'
import { quickSort } from '../../utils/productSortFunc'
import { Select } from '../generetic'

interface ProductSortProps {
  products: IProduct[],
  onChange: (products: IProduct[]) => void
}

export const ProductSort: FC<ProductSortProps> = ({ products, onChange }) => {

  const [defProducts] = useState(products || [])

  const selectHandler = (val:  string) => {
    const newProducts = [...defProducts]
    switch (val) {
      case 'Новые':
      case 'По популярности': 
      case 'По повышению цены':
        quickSort(newProducts, 0, newProducts.length-1, 'up')
      case 'По убыванию цены':
        quickSort(newProducts, 0, newProducts.length-1, 'down')
    }
    console.log(newProducts)
    onChange(newProducts)
  }

  return (
    <div className="product-sort">
      <Select 
        options={['Новые', 'По популярности', 'По убыванию цены', 'По повышению цены']}
        default={'По популярности'}
        onChange={selectHandler}
      />
    </div>
  )
}
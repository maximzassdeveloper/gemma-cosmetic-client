import { FC } from 'react'
import { IProduct } from '../types/product'
import { Product } from './Product/Product'

interface ProductListProps {
  products: IProduct[]
  loading: boolean
}

export const ProductList: FC<ProductListProps> = ({ products, loading }) => {
  return (
    <div className="products">
      {loading && <p>Загрузка...</p>}
      {!loading && !products.length && <p>Товаров нет</p>}
      {!loading && !!products.length && (
        products.map(product => 
          <Product key={product.id} product={product} />
        )
      )}
    </div>
  )
}
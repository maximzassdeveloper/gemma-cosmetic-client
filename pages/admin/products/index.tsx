import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { AdminMain } from '../../../components/hoc'
import { AdminList } from '../../../components/admin'
import authAxios from '../../../services/axiosService'
import { IProduct } from '../../../types/product'
import { useActions } from '../../../hooks/useActions'
import { useTypesSelector } from '../../../hooks/useTypedSelector'

const options = [
  { name: 'id', slug: 'id' },
  { name: 'Имя', slug: 'name' },
  { name: 'Цена', slug: 'price' },
  { name: 'Категории', slug: 'category' }
]

const ProductsPage: NextPage = () => {

  const { deleteProduct, getProducts } = useActions()
  const { products } = useTypesSelector(state => state.product)

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <AdminMain>
      <AdminList 
        link={'/admin/products'} 
        linkOption={'slug'} 
        items={products} 
        options={options} 
        onDelete={id => deleteProduct(id)}
      />
    </AdminMain>
  )
}

export default ProductsPage
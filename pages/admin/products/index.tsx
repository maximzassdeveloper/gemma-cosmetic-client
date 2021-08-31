import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { AdminMain } from '../../../components/hoc'
import { AdminList } from '../../../components/admin'
import authAxios from '../../../services/axiosService'
import { IProduct } from '../../../types/product'

const options = [
  { name: 'id', slug: 'id' },
  { name: 'Имя', slug: 'name' },
  { name: 'Цена', slug: 'price' },
  { name: 'Категории', slug: 'category' }
]

const ProductsPage: NextPage = () => {

  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await authAxios.get('/products')
      setProducts(data)
    }
    getData()
  }, [])

  return (
    <AdminMain>
      <AdminList 
        link={'/admin/products'} 
        linkOption={'slug'} 
        items={products} 
        options={options} 
      />
    </AdminMain>
  )
}

export default ProductsPage
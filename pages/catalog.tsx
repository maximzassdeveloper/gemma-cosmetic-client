import { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Container, Main } from '../components/hoc'
import { ProductFilter, ProductList } from '../components'
import { useActions } from '../hooks/useActions'
import { IAttribute, ICategory, IProduct } from '../types/product'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button } from '../components/generetic'
import { SERVER_URL } from '../utils/config'
import { fetchData } from '../services/dataService'

interface CatalogProps {
  products: IProduct[]
  attributes: IAttribute[]
  categories: ICategory[]
}

const CatalogPage: NextPage<CatalogProps> = ({ products, attributes, categories }) => {

  const router = useRouter()

  const changeFilter = ({ attrs, cats }: { cats: string[], attrs: string[] }) => {
    if (!attrs.length && !cats.length) {
      return router.push('/catalog')
    }

    const query: any = {}
    if (attrs.length) query.attrs = attrs.join(',')
    if (cats.length) query.cats = cats.join(',')
    router.push({ pathname: '/catalog', query })
  }

  return (
    <Main>
      <Container>
        <div className="catalog">
          <ProductFilter 
            onChange={d => changeFilter(d)} 
            attributes={attributes} 
            categories={categories}
          />
          <ProductList 
            products={products}
            loading={false}
          />
        </div>
      </Container>
    </Main>
  )
}
export default CatalogPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let queryUrl = ''
  if (query.attrs) queryUrl += `attrs=${query.attrs}&`
  if (query.cats) queryUrl += `cats=${query.cats}`

  const products = await fetchData(`/products/?${queryUrl}`) || []
  const attributes = await fetchData(`/attributes`) || []
  const categories = await fetchData(`/categories`) || []

  return { props: { products, attributes, categories } }
}

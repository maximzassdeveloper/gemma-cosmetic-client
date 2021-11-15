import { useState, useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Container, Main } from '../components/hoc'
import { ProductFilter, ProductList, ProductSearch } from '../components'
import { IAttribute, ICategory, IProduct } from '../types/product'
import { useRouter } from 'next/router'
import { fetchData } from '../services/dataService'

interface CatalogProps {
  products: IProduct[]
  attributes: IAttribute[]
  categories: ICategory[]
  activeFilters: { [key: string]: string[] }
}

const CatalogPage: NextPage<CatalogProps> = ({ 
  activeFilters, products: iProducts, attributes, categories 
}) => {

  const router = useRouter()
  const [products, setProducts] = useState(iProducts)

  useEffect(() => {
    setProducts(iProducts)
  }, [iProducts])

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
            active={activeFilters}
            onChange={changeFilter} 
            attributes={attributes} 
            categories={categories}
          />
          <div className="catalog__products">
            <div className="catalog__header">
              <ProductSearch
                products={products}
                onChange={setProducts}
              />
            </div>
            <ProductList 
              products={products}
              loading={false}
            />
          </div>
        </div>
      </Container>
    </Main>
  )
}
export default CatalogPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let queryUrl = ''
  const activeFilters: { [key: string]: string[] } = {}
  if (query.attrs) {
    queryUrl += `attrs=${query.attrs}&`
    activeFilters.attrs = Array.isArray(query.attrs) ? query.attrs : [query.attrs]
  }
  if (query.cats) {
    queryUrl += `cats=${query.cats}`
    activeFilters.cats = Array.isArray(query.cats) ? query.cats : [query.cats]
  }

  const products = await fetchData(`/products/?${queryUrl}`) || []
  const attributes = await fetchData(`/attributes`) || []
  const categories = await fetchData(`/categories`) || []

  return { props: { activeFilters, products, attributes, categories } }
}

import { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Container, Main } from '../components/hoc'
import { ProductList } from '../components'
import { useActions } from '../hooks/useActions'
import { IProduct } from '../types/product'
import { fetchData } from '../services/dataService'

interface HomeProps {
  products: IProduct[]
}

const Home: NextPage<HomeProps> = ({ products }) => {

  const { getProducts } = useActions()

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Main>
      <Container>
        <ProductList 
          products={products}
          loading={false}
        />
      </Container>
    </Main>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchData('/products')
  return { props: { products: products || [] } }
}

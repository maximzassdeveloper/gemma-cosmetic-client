import { useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { Container, Main } from '../components/hoc'
import { useActions } from '../hooks/useActions'
import { IProduct } from '../types/product'
import { fetchData } from '../services/dataService'
import { Button } from '../components/generetic'
import { getRandomFromArray } from '../utils/helper'
import { Product, ProductList } from '../components'

interface HomeProps {
  products: IProduct[]
}

const Home: NextPage<HomeProps> = ({ products }) => {

  const { getProducts, setCallToAction } = useActions()

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Main>
      <Container>
        <div className="home">

          <div className="home-first">
            <div className="home-first__info">
              <h1 className="title">Корейская косметика <br/>GEMMA в России</h1>
              <p>Высококачественная продукция премиум-класса производства Южной Кореи!</p>
              <div className="home-first__buttons">
                <Button onClick={() => setCallToAction(true)}><Link href='/partners'>Стать партнером</Link></Button>
                <Button className="outlined"><Link href='/catalog'>Приступить к покупкам</Link></Button>
              </div>
            </div>
            <div className="home-first__products">
              <ProductList loading={false} products={getRandomFromArray(products, 2)} />
            </div>
          </div>

        </div>
      </Container>
    </Main>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchData('/products')
  return { props: { products: products || [] } }
}

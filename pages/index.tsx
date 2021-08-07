import { useEffect } from 'react'
import { NextPage } from 'next'
import { observer } from 'mobx-react-lite'

import { Container, Main } from '../components/hoc'
import { ProductList } from '../components'
import { useStores } from '../store'

const Home: NextPage = observer(() => {

  const { productStore } = useStores()

  useEffect(() => {
    productStore.getProducts()
  }, [])

  return (
    <Main>
      <Container>
        <ProductList 
          products={productStore.products} 
          loading={productStore.loading}
        />
      </Container>
    </Main>
  )
})

export default Home
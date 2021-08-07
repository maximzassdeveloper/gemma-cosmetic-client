import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../store'
import { Container, Main } from '../../components/hoc'
import { SingleProduct } from '../../components'

const SingleProductPage: NextPage = observer(() => {

  const { productStore } = useStores()
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    if (slug && !Array.isArray(slug)) {
      productStore.getProduct(slug)
    }
  }, [slug])

  // console.log(toJS(producе))

  return (
    <Main>
      <Container>
        {productStore.loading && <p>Загрузка...</p>}
        {productStore.product && <SingleProduct product={productStore.product} />}
      </Container>
    </Main>
  )
})

export default SingleProductPage
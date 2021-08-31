import { NextPage, GetServerSideProps } from 'next'
import axios from 'axios'
import { Container, Main } from '../../components/hoc'
import { SingleProduct } from '../../components'
import { IProduct } from '../../types/product'
import { SERVER_URL } from '../../utils/config'
import { fetchData } from '../../services/dataService'

interface Props {
  product: IProduct
}

const SingleProductPage: NextPage<Props> =({ product }) => {
  return (
    <Main title={`${product.name}`}>
      <Container>
        <SingleProduct product={product} />
      </Container>
    </Main>
  )
}

export default SingleProductPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const products = await fetchData(`/products/product/` + params?.slug)
  if (!products) return { notFound: true }

  return { props: { products } }
}
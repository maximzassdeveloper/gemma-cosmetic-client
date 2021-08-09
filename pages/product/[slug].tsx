import { NextPage, GetServerSideProps } from 'next'
import axios from 'axios'
import { Container, Main } from '../../components/hoc'
import { SingleProduct } from '../../components'
import { IProduct } from '../../types/product'

interface Props {
  product: IProduct
}

const SingleProductPage: NextPage<Props> =({ product }) => {
  return (
    <Main>
      <Container>
        <SingleProduct product={product} />
      </Container>
    </Main>
  )
}

export default SingleProductPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/product/` + params?.slug)
  if (!data) return { notFound: true }

  return { props: { product: data } }
}
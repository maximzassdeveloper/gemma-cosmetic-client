import { NextPage, GetServerSideProps } from 'next'
import { Container, Main } from '../../components/hoc'
import { SingleProduct } from '../../components'
import { IProduct } from '../../types/product'
import { fetchData } from '../../services/dataService'

interface Props {
  product: IProduct
}

const SingleProductPage: NextPage<Props> =({ product }) => {
  return (
    <Main 
      title={product.metaTitle || product.name}
      keywords={product.metaKeywords}
      description={product.metaDesc}
      robots={product.metaRobots}
    >
      <Container>
        <SingleProduct product={product} />
      </Container>
    </Main>
  )
}

export default SingleProductPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const product = await fetchData(`/products/product/` + params?.slug)
  if (!product) return { notFound: true }

  return { props: { product } }
}
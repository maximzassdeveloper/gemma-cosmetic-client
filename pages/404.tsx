import { NextPage } from 'next'
import { Container, Main } from '../components/hoc'

const Page404: NextPage = () => {
  return (
    <Main>
      <Container>
        <div className="page404">
          <h1>404</h1>
          <p>Страница не найдена</p>
        </div>
      </Container>
    </Main>
  )
}

export default Page404
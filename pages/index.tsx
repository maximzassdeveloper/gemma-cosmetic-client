import { GetServerSideProps, NextPage } from 'next'
import { Container, Main } from '../components/hoc'
import { IProduct } from '../types/product'
import { fetchData } from '../services/dataService'
import { CallbackForm } from '../components'
import ScrollCircle from '../public/home/scrollCircle.svg'
import { Contact, FAQ, Gallery, ProductSection } from '../components/sections'
import { getRandomFromArray } from '../utils/helper'

interface HomeProps {
  products: IProduct[]
}

const advantages = [
  { src: 'home/list1.svg', title: 'Свободный рынок' },
  { src: 'home/list2.svg', title: 'Премиальная уникальная продукция' },
  { src: 'home/list3.svg', title: 'Нет обязательных ежемесячных закупок' },
  { src: 'home/list4.svg', title: 'Несгораемые квалификации' },
  { src: 'home/list5.svg', title: 'Щедрый маркетинг на высоких уровнях' },
]

const Home: NextPage<HomeProps> = ({ products }) => {

  const submitHandler = (data: any) => {

  }

  return (
    <Main className="home">

      <section className="home-first">
        <Container>
          <h1>Корейская <br/>
          косметика <br/>
          Gemma<br/>
          уже в России</h1>
          <div className="home-first__col">
            <p>Высококачественная продукция премиум-класса производства Южной Кореи!</p>
            <CallbackForm 
              className="home-first__form"
              before={<><h3>Сделайте первый шаг <br/>к своему будущему</h3></>}
              onSubmit={submitHandler}
            />
          </div>
          <div className="scroll-circle">
            <div className="scroll-circle__line scroll-circle__line--1"></div>
            <div className="scroll-circle__img">
              <ScrollCircle />
            </div>
            <div className="scroll-circle__line scroll-circle__line--2"></div>
          </div>

        </Container>
      </section>

      <section className="home-advantages">
        <Container className="d-flex align-items-center justify-center">
          <ul className="home-advantages__list">
            {advantages.map(advantage => 
              <li key={advantage.title+advantage.src} className="home-advantages__point">
                <img src={advantage.src} alt="" />
                {advantage.title}
              </li>
            )}
          </ul>
          <div className="home-advantages__image">
            <img src="home/general1.jpg" alt="" />
          </div>
        </Container>
      </section>

      <ProductSection 
        products={getRandomFromArray(products, 10)} 
        title={<>Наша <br/>продукция</>} 
      />

      <Gallery title={<>Награды и<br/> сертификаты</>} />

      <section className="home-info">
        <Container className="d-flex justify-center">
          <div className="home-info__col">
            <FAQ />
          </div>
          <div className="home-info__col">
            <Contact />
          </div>
        </Container>
      </section>

    </Main>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchData('/products')
  return { props: { products: products || [] } }
}

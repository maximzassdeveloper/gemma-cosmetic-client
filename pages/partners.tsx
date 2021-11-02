import { NextPage, GetServerSideProps } from 'next'
import { Container, Main } from '../components/hoc'
import { fetchData } from '../services/dataService'
import { IPage } from '../types/help'
import { FAQ, Contact, PlanRewards, NumbersSection, CallbackSection } from '../components/sections'
import { TagList } from '../components'
import { Button } from '../components/generetic'

interface Props {
  page: IPage
}

const Page: NextPage<Props> = ({ page }) => {
  return (
    <Main 
      description={page?.metaDesc} 
      title={page?.name}
      keywords={page?.metaKeywords}
      robots={page?.metaRobots}
      className="partners"
    > 

      <section className="partners-first">
        <Container>
          <div className="partners-first__info">
            <h1>Становитесь <br/>нашим партнёром</h1>
            <p>Приглашаем к сотрудничеству всех кто хочет заработать на старте новой корейской компании на рынке России и СНГ — это уникальная возможность достижения высоких результатов за кратчайшие сроки!</p>
            <Button href='#becomePartner'>Присоединяйтесь</Button>
          </div>
        </Container>
      </section>

      <section className="section-image">
        <Container className="d-flex align-items-center justify-center">
          <img src="partners/partners1.jpg" alt="" />
          <div className="section-image__info">
            <h3>Gemma Korea — это  готовая бизнес-система, способоная привести вас к финансовому успеху!</h3>
            <p>В сетевой компании деньги можно зарабатывать легко и интересно. Продукция Gemma Korea настолько хороша, что продает себя сама. Вы сами её пробуете и рекомендуете другим.
            <br/><br/>
            Создавайте свою сеть. Станьте лидером для других и зарабатывайте больше. Gemma Korea — это бизнес в команде. Всегда проще начинать, когда рядом заинтересованные люди с общей целью.</p>
          </div>
        </Container>
      </section>

      <PlanRewards />
      
      <NumbersSection items={[
        {number: 100000, suffix: 'руб.', text: 'Ежемесячный доход нашего партнера за первые месяцы'},
        {number: 45, suffix: '%', text: 'С такой скидкой вы закупаете нашу продукцию'},
        {number: 18936, suffix: 'людей', text: 'Уже являются нашими партнерами'}
      ]} />

      <CallbackSection id="becomePartner" />

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

      <TagList tags={page?.tags} />

    </Main>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async () => {
  const page = await fetchData(`/pages/page/partners`)

  return { props: { page } }
}
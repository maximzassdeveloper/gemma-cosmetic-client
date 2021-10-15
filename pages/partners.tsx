import { NextPage, GetServerSideProps } from 'next'
import { Container, Main } from '../components/hoc'
import { fetchData } from '../services/dataService'
import { IPage } from '../types/help'
import { FAQ, TagList } from '../components'
import { Button } from '../components/generetic'
import { useActions } from '../hooks/useActions'

interface Props {
  page: IPage
}

interface IReward {
  name: string
  content: string
}

const rewards: IReward[] = [
  { name: 'Розничная продажа', content: 'Самый простой вид заработка. Покупайте и продавайте' },
  { name: 'Бонус за рекомендацию', content: 'Делитесь информацией и получайте вознограждение от компании' },
  { name: 'Бинарный бонус', content: 'Для быстрого и динамичного развития вашей команды' },
  { name: 'Квалификационный бонус', content: 'Для удовлетворения потребностей настоящего лидера' },
  { name: 'Матчинг бонус', content: 'Подготавливай новых лидеров и получай дополнительные вознограждения' },
]

const Page: NextPage<Props> = ({ page }) => {

  const { setCallToAction } = useActions()

  return (
    <Main 
      description={page.metaDesc} 
      title={page.name}
      keywords={page.metaKeywords}
      robots={page.metaRobots}
    > 
      <div className="partners">
        <Container>

          <h1>Стать партнером</h1>

          <p>Приглашаем к сотрудничеству всех кто хочет заработать на старте новой корейской компании на рынке России и СНГ — это уникальная возможность достижения высоких результатов за кратчайшие сроки!</p>

          <div className="block-with-image block">
            <img src="/partners/image2.jpg" alt="" />
            <div>
              <p>В сетевой компании деньги можно зарабатывать легко и интересно. Продукция Gemma Korea настолько хороша, что продает себя сама. Вам просто пробуете ее сами и рекомендуете другим.</p><br />
              <p>Создавайте свою сеть. Станьте лидером для других и зарабатывайте больше. Gemma — это бизнес в команде. Всегда проще начинать, когда рядом заинтересованные люди с общей целью.</p>
            </div>
          </div>

          <div className="block rewards">

            <div className="rewards__header">
              <div className="rewards__col">
                <h2>— Для вас <br />подготовлено 5 видов <br />вознагрождения</h2>
              </div>
              <div className="rewards__col">
                <p>А еще путешествия, автомобили, квартиры и крупные денежные призы</p>
              </div>
            </div>

            <div className="rewards__list">
              {rewards.map((rew, index) => 
                <div key={index} className="reward rewards__col">
                  <span className="reward__number">{index+1}</span>
                  <div>
                    <h3>{rew.name}</h3>
                    <p>{rew.content}</p>
                  </div>
                </div>
              )}
              <a 
                href="/partners/marketing.pdf" 
                target='_blank' 
                className="reward download rewards__col"
              >Открыть PDF файл с подробным маркетинг планом</a>
            </div>

          </div>
                
          <div className="block">
            <p>На сегодняшний день GЕММА успешно ведет свой бизнес в 15 странах мира. Также набирает популярность и завоевывает сердца людей. А все потому, что продукция не имеет аналогов, изготавливается только из натуральных продуктов, направлена на улучшение качества жизни своих потребителей! Вся продукция компании имеет международные сертификаты, подтверждающие ее качество.</p>
            <br />
            <ul>
              <li>Еженедельные выплаты без лимитов</li>
              <li>Уникальный маркетинговый план</li>
              <li>Сохранение достигнутой квалификации</li>
              <li>Системам поддержки — рост вашей команды</li>
            </ul>
          </div>
        </Container>

        <div className="block banner">
          <Container>
            <h2>Gemma Korea — это  готовая бизнес-система, способоная привести вас к финансовому успеху!</h2>
            <Button onClick={() => setCallToAction(true)}>Стать партнером</Button>
          </Container>
        </div>

        <Container>

          <div className="block">
            <FAQ 
              items={[
                { title: 'Как осуществляется доставка товара?', content: 'Доставка осуществляется по всем городам Росии и зарубеж. Стоимость доставки от 300 руб. Срок доставка 2-5 дней.' },
                { title: 'Как оплатить товар?', content: 'Наличные и оплата картой, от любого банка' },
                { title: 'Как попасть к вам в команду?', content: 'Нажать на кнопку выше, отправить заявку и мы с вами свяжемся.' }
              ]}
            />
          </div>        

          <TagList tags={page.tags} />

        </Container>
      </div>
    </Main>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async () => {
  const page = await fetchData(`/pages/page/partners`)
  if (!page) return { notFound: true }

  return { props: { page } }
}
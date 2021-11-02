import { FC } from 'react'
import classnames from '../../utils/classnames'
import { Container } from '../hoc'

interface PlanRewardsProps {
  className?: string
}

const rewards = [
  { name: 'Розничная продажа', content: 'Самый простой вид заработка. Покупайте и продавайте', icon: 'partners/reward1.svg' },
  { name: 'Бонус за рекомендацию', content: 'Делитесь информацией и получайте вознограждение от компании', icon: 'partners/reward2.svg' },
  { name: 'Бинарный бонус', content: 'Для быстрого и динамичного развития вашей команды', icon: 'partners/reward3.svg' },
  { name: 'Квалификационный бонус', content: 'Для удовлетворения потребностей настоящего лидера', icon: 'partners/reward4.svg' },
  { name: 'Матчинг бонус', content: 'Подготавливайте новых лидеров и получайте дополнительные вознограждения', icon: 'partners/reward5.svg' },
]

export const PlanRewards: FC<PlanRewardsProps> = ({ className }) => {
  return (
    <section className={classnames('rewards', className)}>
      <Container>

        <div className="rewards__header rewards-flex">
          <h2 className="section-title rewards__col">Для вас <br/> 
          подготовлено 5 видов <br/>вознагрождения</h2>  
          <p className="rewards__col">А еще путешествия, автомобили, квартиры и крупные денежные призы</p>
        </div>

        <div className="rewards__list">
          {rewards.map(reward =>
            <div key={reward.name} className="rewards-item rewards__col">
              <div className="rewards-item__image">
                <img src={reward.icon} alt="" />
              </div>
              <div className="rewards-item__content">
                <h3>{reward.name}</h3>
                <p>{reward.content}</p>
              </div>
            </div>
          )}
          <a 
            href="/partners/marketing.pdf" 
            target='_blank' 
            className="rewards-item--download rewards__col"
          >Скачайте PDF файл с подробным маркетинг планом</a>
        </div>

      </Container>
    </section>
  )
}
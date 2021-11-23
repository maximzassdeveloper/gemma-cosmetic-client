import { FC } from 'react'

const contacts = [
  { name: 'Инстаграм', text: '@gemma_in_russia', link: 'https://instagram.com/gemma_in_russia' },
  { name: 'Телеграм', text: 't.me/gemma_in_russia', link: 'https://t.me/gemma_in_russia' },
  { name: 'Почта', text: 'info@gemmainrussia.ru', link: 'mailto:info@gemmainrussia.ru' },
  { name: 'Телефон', text: '+7 (985) 815-25-25', link: 'tel:+7 (985) 815-25-25' }
]

export const Contact: FC = () => {
  return (
    <>
      <h2 className="section-title">Контакты</h2>
      <div className="contacts">
        {contacts.map(c =>
          <div key={c.name+c.text} className="contacts__item">
            <span>{c.name}</span>
            {c.link ? <a href={c.link} rel="noreferrer" target='_blank'>{c.text}</a> : <p>{c.text}</p>}
          </div>
        )}
      </div>
    </>
  )
}
import { FC } from 'react'

const contacts = [
  { name: 'Инстаграм', text: 'gemmakoreainrussia', link: 'https://instagram.com' },
  { name: 'Телеграм', text: 'gemmakorea' },
  { name: 'Почта', text: 'info@gemmainrussia.ru', link: 'mailto:info@gemmainrussia.ru' },
  { name: 'Телефон', text: '+7 (916) 456-34-27', link: 'tel:+7 (916) 456-34-27' }
]

export const Contact: FC = () => {
  return (
    <>
      <h2 className="section-title">Контакты</h2>
      <div className="contacts">
        {contacts.map(c =>
          <div key={c.name+c.text} className="contacts__item">
            <span>{c.name}</span>
            {c.link ? <a href={c.link}>{c.text}</a> : <p>{c.text}</p>}
          </div>
        )}
      </div>
    </>
  )
}
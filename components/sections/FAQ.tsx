import React, { FC } from 'react'
import SlideToggle from 'react-slide-toggle'

interface FAQProps {
  items?: { title: string, content: string }[]
}

const faqItemsDefault = [
  {title: 'Как осуществляется доставка товара?', content: 'Доставка осуществляется по всем городам Росии и зарубеж. Стоимость доставки от 300 руб. Срок доставка 2-5 дней.'},
  {title: 'Как оплатить товар?', content: 'Оплату можно осуществить через платёжную систему на сайте или прямым переводом на карту.'},
  {title: 'Можно ли забрать заказ лично?', content: 'Да, вы можете лично приехать к нам в офис, и мы отдадим вам ваш заказ.'}
]

export const FAQ: FC<FAQProps> = ({ items = faqItemsDefault }) => {

  if (!items || !items.length) return null

  return (
    <>
      <h2 className="section-title">Вопрос-ответ</h2>
      <div className="faq">
        {items.map((i, index) => 
          <SlideToggle 
            key={i.title+index}
            collapsed={index !== 0}
            duration={300}
            render={({ onToggle, setCollapsibleElement, progress }) => (
              <div className="faq__item item">
                <h4 onClick={onToggle} className="item__title">
                  <div className="item__toggle">{Math.round(progress) ? '-' : '+'}</div>
                  {i.title}
                </h4>
                <p className="item__content" ref={setCollapsibleElement}>{i.content}</p>
              </div>
            )}
          />
        )}
      </div>
    </>
  )
}
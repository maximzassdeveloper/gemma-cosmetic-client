import React, { FC } from 'react'
import SlideToggle from 'react-slide-toggle'

interface FAQProps {
  items: { title: string, content: string }[]
}

export const FAQ: FC<FAQProps> = ({ items }) => {

  if (!items || !items.length) return null

  return (
    <div className="faq">
      {items.map((i, index) => 
        <SlideToggle 
          key={i.title+index}
          collapsed={index !== 0}
          duration={300}
          render={({ onToggle, setCollapsibleElement, progress }) => (
            <div className="faq__item item">
              <h4 onClick={onToggle} className="item__title">
                <div className="item__toggle">{Math.round(progress) ? '+' : '-'}</div>
                {i.title}
              </h4>
              <p className="item__content" ref={setCollapsibleElement}>{i.content}</p>
            </div>
          )}
        />
      )}
    </div>
  )
}
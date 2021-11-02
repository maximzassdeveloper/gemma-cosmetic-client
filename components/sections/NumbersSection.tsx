import { FC } from 'react'
import classnames from '../../utils/classnames'
import { Container } from '../hoc'

interface NumberSectionItem {
  number: number
  suffix?: string
  text: string
}

interface NumbersSectionProps {
  items: NumberSectionItem[]
  className?: string
}

export const NumbersSection: FC<NumbersSectionProps> = ({ items, className }) => {
  return (
    <section className={classnames('numbers-section', className)}>
      <Container>

        {items.map(item => 
          <div key={item.number+item.suffix} className="numbers-section-item">
            <div className="numbers-section-item__number">{item.number.toLocaleString()}</div>
            <span>{item.suffix}</span>
            <p>{item.text}</p>
          </div>
        )}

      </Container>
    </section>
  )
}
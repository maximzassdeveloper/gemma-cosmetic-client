import { FC } from 'react'
import classnames from '../../utils/classnames'
import { CURRENCY } from '../../utils/config'

interface PriceProps {
  price: number
  className?: string
}

export const Price: FC<PriceProps> = ({ price, className }) => {

  const convertPrice = () => {
    return price
  }

  return (
    <div className={classnames('price', className)}>
      <span>{convertPrice()} {CURRENCY}</span>
    </div>
  )
}
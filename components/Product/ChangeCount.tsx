import { FC, useState, useEffect } from 'react'
import classnames from '../../utils/classnames'
import { useTransition, animated } from '@react-spring/web'

interface Props {
  startCount: number
  max?: number
  min?: number
  className?: string
  onChange?: (count: number) => void
}

export const ChangeCount: FC<Props> = ({ startCount, max = 10, min = 1, className, onChange }) => {

  const [count, setCount] = useState(startCount)
  const [up, setUp] = useState(true)

  useEffect(() => {
    if (count !== startCount) {
      setCount(startCount)
    }
  }, [startCount])

  const increment = () => {
    if (count+1 <= max) {
      setCount(count + 1)
      setUp(true)
    }
  }

  const decrement = () => {
    if (count-1 >= min) {
      setCount(count - 1)
      setUp(false)
    }
  }

  useEffect(() => {
    if (onChange) onChange(count)
  }, [count])

  const transition = useTransition(count, {
    from: { transform: up ? 'translateY(-100%)' : 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: up ? 'translateY(100%)' : 'translateY(-100%)' },
    config: { duration: 150 }
  })

  return (
    <div className={`count ${className || ''}`.trim()}>
      <div 
        onClick={increment} 
        className={classnames('count__btn', 'count__inc', { 'disabled': count >= max })}
      >+</div>

      <div className="count__wrap">
        {transition((style, item) =>
          <animated.div style={style} className="count__num">{item}</animated.div>
        )}
      </div>

      <div 
        onClick={decrement} 
        className={classnames('count__btn', 'count__decr', { 'disabled': count <= min })}
      >-</div>
    </div>
  )
}
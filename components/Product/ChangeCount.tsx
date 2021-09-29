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
  const [disableDec, setDisableDec] = useState(false)
  const [disableInc, setDisableInc] = useState(false)

  useEffect(() => {
    if (count !== startCount) {
      setCount(startCount)
    }
  }, [startCount])

  const timeout = () => {
    setDisableDec(true)
    setDisableInc(true)
    setTimeout(() => {
      setDisableDec(false)
      setDisableInc(false)
    }, 600)
  }

  const increment = () => {
    if (count+1 <= max) {
      setCount(count + 1)
      setUp(true)
      timeout()
    }
  }

  const decrement = () => {
    if (count-1 >= min) {
      setCount(count - 1)
      setUp(false)
      timeout()
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
      <button 
        disabled={disableInc}
        onClick={increment} 
        className={classnames('count__btn', 'count__inc')}
      >+</button>

      <div className="count__wrap">
        {transition((style, item) =>
          <animated.div style={style} className="count__num">{item}</animated.div>
        )}
      </div>

      <button 
        disabled={disableDec}
        onClick={decrement} 
        className={classnames('count__btn', 'count__decr')}
      >-</button>
    </div>
  )
}
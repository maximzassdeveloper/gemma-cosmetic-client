import { FC, useState } from 'react'
import { useTransition, animated } from '@react-spring/web'
import { Star } from 'react-feather'

interface CreateRatingProps {
  onChange: (value: number) => void
  error: boolean
}

export const CreateRating: FC<CreateRatingProps> = ({ onChange, error }) => {

  const [stars, setStars] = useState<boolean[]>([false, false, false, false, false])
  const [hoveredStars, setHoveredStars] = useState<boolean[]>([false, false, false, false, false])

  const enterHandler = (index: number) => {
    setHoveredStars(stars.map((x, ind) => ind <= index))
  }

  const leaveHandler = () => {
    setHoveredStars(stars)
  }

  const clickHandler = (index: number) => {
    setStars(stars.map((x, ind) => ind <= index))
    onChange(index+1)
  }

  const errorTransition = useTransition(error, {
    from: { transform: 'translateX(-10px)', opacity: 0 },
    enter: { transform: 'translateX(0px)', opacity: 1 },
    leave: { transform: 'translateX(10px)', opacity: 0 },
    config: { duration: 150 },
  })

  return (
    <div className={`create-rating ${error ? 'error' : ''}`.trim()}>
      {hoveredStars.map((i, index) => 
        <Star 
          onMouseEnter={() => enterHandler(index)}
          onMouseLeave={() => leaveHandler()}
          onClick={() => clickHandler(index)}
          key={index} 
          className={`star ${i ? 'fill': ''}`.trim()} 
        />
      )}

      {errorTransition((styles, item) => 
        item && (
          <animated.div style={styles} className="input__error">Выберите рейтинг</animated.div>
        )
      )}
    </div>
  )
}
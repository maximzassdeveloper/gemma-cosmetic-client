import { FC, useState, useEffect } from 'react'
import { Star } from 'react-feather'

interface RatingProps {
  rating: number
  className?: string
}

export const Rating: FC<RatingProps> = ({ rating, className }) => {

  const [stars, setStars] = useState<boolean[]>([])

  const createStars = () => {
    const st = []
    for (let i = 1; i <= 5; i++) {
      st.push(i <= rating)
    }
    setStars(st)
  }

  useEffect(() => {
    createStars()
  }, [rating])

  return (
    <div className={`rating ${className || ''}`.trim()}>
      {stars.map((i, index) => 
        <Star key={index} className={`star ${i ? 'fill': ''}`.trim()} />
      )}  
    </div>
  )
}
import { FC, useRef, ReactNode, useState, useEffect } from 'react'
import { Splide } from '@splidejs/react-splide'
import { Container } from '../hoc'

interface SliderSectionProps {
  title?: ReactNode
  className?: string
  count: number
}

export const SliderSection: FC<SliderSectionProps> = ({ 
  children, title, className, count
}) => {

  const [inCount, setInCount] = useState(count)
  const bar = useRef<HTMLDivElement>(null)
  const slider = useRef<any>(null)

  useEffect(() => {
    setInCount(count)
  }, [count])

  const moveHandler = (splide: any, index: number = 0) => {
    if (!bar.current) return
    
    const { length } = splide.Components.Elements.slides
    bar.current.style.width = 100 / length * inCount + '%'
    bar.current.style.left = 100 / length * index + '%'
  }

  return (
    <section className={className}>
      <Container>
        
        <div className="slider__header">
          {title && <h2 className="section-title">{title}</h2>}
          <div className="slider-progress-bar">
            <div ref={bar} className="slider-progress-bar__active"></div>
          </div>
        </div>

        <Splide
          ref={slider}
          className="slider"
          options={{
            rewind: true,
            gap: '20px',
            perMove: 1,
            perPage: inCount,
            pagination: false,
            classes: {
              arrows: 'slider__arrows'
            }
          }}
          onMove={moveHandler}
          onMounted={moveHandler}
        >
          {children}
        </Splide>

      </Container>
    </section>
  )
}
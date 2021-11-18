import { FC } from 'react'
import { Container } from '../hoc'

export const AdvantageImages: FC = () => {
  return (
    <section className="advantage-images">
      {/* <Container> */}

        {Array.apply(null, {length: 4}).map((_, index) => 
          <div key={index} className="advantage-images__item">
            <img src={`./advantage${index+1}.jpg`} alt="" />
          </div>
        )}

      {/* </Container> */}
    </section>
  )
}
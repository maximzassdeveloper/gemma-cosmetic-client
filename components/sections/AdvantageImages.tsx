import { FC } from 'react'

export const AdvantageImages: FC = () => {
  return (
    <section className="advantage-images">

        {Array.apply(null, {length: 4}).map((_, index) => 
          <div key={index} className="advantage-images__item">
            <img src={`./advantage${index+1}.jpg`} alt="" />
          </div>
        )}

    </section>
  )
}
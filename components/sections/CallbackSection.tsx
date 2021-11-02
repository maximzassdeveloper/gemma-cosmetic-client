import { FC } from 'react'
import classnames from '../../utils/classnames'
import { Container } from '../hoc'
import { CallbackForm } from '..'

interface CallbackSectionProps {
  className?: string
  id?: string
}

export const CallbackSection: FC<CallbackSectionProps> = ({ className, id }) => {
  return (
    <section id={id} className={classnames('callback-section', className)}>
      <Container className="d-flex align-items-center justify-center">

        <img src='partners/partners3.jpg' alt='' />

        <CallbackForm 
          className="callback-section__form"
          before={<>
            <h2 className="section-title">Сделайте первый шаг <br/>к своему будущему</h2>
          </>}
          onSubmit={() => null} 
        />

      </Container>
    </section>
  )
}
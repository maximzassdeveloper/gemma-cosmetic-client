import { FC } from 'react'
import { Container } from './hoc'

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Container>
        <p>Все права защищены</p>
      </Container>
    </footer>
  )
}
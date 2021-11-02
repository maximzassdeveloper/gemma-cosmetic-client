import { FC } from 'react'
import { Instagram, Mail, Send } from 'react-feather'
import { Container } from './hoc'

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="logo">Gemma</div>
        <p>© Copyright {(new Date).getFullYear()} gemmainrussia.ru</p>
        <div className="footer__socials">
          <a href=""><Instagram /></a>
          <a href=""><Send /></a>
          <a href=""><Mail /></a>
        </div>
      </Container>
    </footer>
  )
}
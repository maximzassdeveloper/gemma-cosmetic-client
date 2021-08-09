import { FC } from 'react'
import { Header, Footer } from '..'

export const Main: FC = ({ children }) => {
  return (
    <main className="main">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
import { FC } from 'react'
import { Header } from '../Header'

export const Main: FC = ({ children }) => {
  return (
    <main className="main">
      <Header />
      {children}
    </main>
  )
}
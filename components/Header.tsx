import { FC } from 'react'
import Link from 'next/link'
import { Container } from './hoc'
import { useStores } from '../store'
import { observer } from 'mobx-react-lite'
import { Cart } from './Cart/Cart'

export const Header: FC = observer(() => {

  const { userStore, cartStore } = useStores()

  const logoutHandler = () => {
    userStore.logout()
    cartStore.setProducts([])
  }

  return <>
    <header className="header">
      <Container>

        <div className="header__logo">
          <Link href='/'>Gemma Cosmetic</Link>
        </div>

        <nav className="header__menu">
          <ul>
          </ul>
        </nav>

        <div className="header__info">
          {userStore.isAuth
            ? <>
              <span onClick={() => cartStore.setActive(!cartStore.active)}>
                Корзина {cartStore.count}
              </span>
              <span>{userStore.user.name}</span>
              <span onClick={logoutHandler}>Выход</span>
            </>
            : <>
              <Link href='/register'>Регистрация</Link>
              <Link href='/login'>Вход</Link>
            </>
          }
        </div>

      </Container>
    </header>
    <Cart />
  </>
})
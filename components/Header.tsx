import { FC } from 'react'
import Link from 'next/link'
import { Container } from './hoc'
import { Cart } from './Cart/Cart'
import { useActions } from '../hooks/useActions'
import { useTypesSelector } from '../hooks/useTypedSelector'

export const Header: FC = () => {

  const { setActiveCart, clearCart, logout } = useActions()
  const { active, count } = useTypesSelector(state => state.cart)
  const { isAuth, user } = useTypesSelector(state => state.user)

  const logoutHandler = () => {
    logout()
    clearCart()
  }

  return <>
    <header className="header">
      <Container>

        <div className="header__logo">
          <Link href='/'>Gemma Cosmetic</Link>
        </div>

        <nav className="header__menu">
          <ul>
            <li><Link href='/catalog'>Каталог</Link></li>
            <li><Link href='/reviews'>Отзывы</Link></li>
            <li><Link href='/blog'>Блог</Link></li>
            <li><Link href='/partners'>Стать партнером</Link></li>
          </ul>
        </nav>

        <div className="header__info">
          {isAuth
            ? <>
              {user.role === 'ADMIN' ? <Link href='/admin'>Админка</Link> : null}
              <span onClick={() => setActiveCart(!active)}>
                Корзина {count}
              </span>
              <Link href={`/user/${user.id}`}>{user.name}</Link>
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
    {isAuth && <Cart />}
  </>
}
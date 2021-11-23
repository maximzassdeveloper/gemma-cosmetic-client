import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ShoppingCart, User, Menu, X } from 'react-feather'
import { Container } from './hoc'
import { Cart } from './Cart/Cart'
import { useActions } from '../hooks/useActions'
import { useTypesSelector } from '../hooks/useTypedSelector'
import { ActiveLink } from '.'
import { Button } from './generetic'

export const Header: FC = () => {

  const { setActiveCart, clearCart, logout, getPages } = useActions()
  const { active, count } = useTypesSelector(state => state.cart)
  const { isAuth, user } = useTypesSelector(state => state.user)
  const { pages } = useTypesSelector(state => state.help)
  const [menuActive, setMenuActive] = useState(false)
  const router = useRouter()

  const logoutHandler = () => {
    logout()
    clearCart()
  }

  useEffect(() => { 
    getPages()
  }, [])

  useEffect(() => {
    if (!menuActive) return

    function clickOver(e) {
      if (!e.target.closest('.header__menu-mobile')) setMenuActive(false)
    }
    window.addEventListener('click', clickOver)
    return () => {
      window.removeEventListener('click', clickOver)
    }

  }, [menuActive])

  return <>
    <header className="header">
      <Container>

        {!menuActive && <div 
          onClick={() => setMenuActive(true)} 
          className="header__burger"><Menu /></div>}
        {menuActive && <div 
          onClick={() => setMenuActive(false)} 
          className="header__close"><X /></div>}

        <div className="header__logo">
          <Link href='/'>Gemma Korea</Link>
        </div>

        <nav className="header__menu">
          <ul>
            <li><ActiveLink href='/catalog'>Каталог</ActiveLink></li>
            <li><ActiveLink href='/reviews'>Отзывы</ActiveLink></li>
            {!!pages.length && pages.map(p =>
              p.slug !== 'partners' && <li key={p.id}>
                <ActiveLink href={`/${p.slug}`}>{p.name}</ActiveLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="header__info">
          <Button onClick={() => router.push('/partners')} className="header__partners">
            Стать <br/>партнёром
          </Button>
          {isAuth
            ? <>
              {/* {user.role === 'ADMIN' 
                ? <span className="header__admin"><Link href='/admin'>Админ</Link></span> 
                : null
              } */}
              <span onClick={() => setActiveCart(!active)} className="header__cart">
                <ShoppingCart /> <p>Корзина</p> {count}
              </span>
              <ActiveLink href={`/user/${user.id}`}>
                <span className="header__user"><User /><p>{user.name}</p></span>
              </ActiveLink>
              <span onClick={logoutHandler} className="header__logout">Выход</span>
            </>
            : <div className="mobile-none">
              <ActiveLink href='/register'>Регистрация</ActiveLink>
              <ActiveLink href='/login'>Вход</ActiveLink>
            </div>
          }
        </div>

      </Container>
    </header>
    <div className={`header__menu-mobile${menuActive ? ' active' : ''}`}>
      <ul>
        <li><ActiveLink href='/catalog'>Каталог</ActiveLink></li>
        <li><ActiveLink href='/reviews'>Отзывы</ActiveLink></li>
        {!!pages.length && pages.map(p =>
          <li key={p.id}><ActiveLink href={`/${p.slug}`}>{p.name}</ActiveLink></li>
        )}
        {!isAuth 
          ? <div className="lr">
              <ActiveLink href='/register'>Регистрация</ActiveLink>
              <ActiveLink href='/login'>Вход</ActiveLink>
            </div>
          : <div className="lr">
              <ActiveLink href={`/user/${user.id}`}>Аккаунт</ActiveLink>
              <a onClick={logoutHandler}>Выход</a>
            </div>
        }
      </ul>
    </div>
    {isAuth && <Cart />}
  </>
}
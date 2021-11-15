import { FC, useEffect, useState } from 'react'
import { useTransition, animated, config } from '@react-spring/web'
import { X } from 'react-feather'
import Confetti from 'react-confetti'
import { useTypesSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import classnames from '../utils/classnames'
import { getCookie, setCookie } from '../utils/cookieFunctions'
import { CallbackForm } from '.'

export const CallToActionPopup: FC = () => {
  
  const { setCallToAction } = useActions()
  const { callToAction: active } = useTypesSelector(state => state.help)
  const [isSubmit, setIsSubmit] = useState(false)

  const submitHandler = () => {
    setCookie('ispartner', true, 15)
    setIsSubmit(true)
  }

  const timeout = () => {
    const isPartner = getCookie('ispartner')
    if (!isPartner) {
      setTimeout(() => {
        !active ? setCallToAction(true) : null
      }, 5*60*1000)
    }
  }

  useEffect(() => {
    timeout()
    document.body.style.overflow = active ? 'hidden' : 'auto'
    if (!active && isSubmit) setIsSubmit(false)
  }, [active])
  
  useEffect(() => {
    timeout()
  }, [])

  const confettiRender = () => {
    const h = window.innerHeight
    const w = window.innerWidth
    return <Confetti width={w} height={h} />
  }

  const animation = useTransition(active, {
    from: { transform: 'scale(1.2)', opacity: 0 },
    enter: { transform: 'scale(1)', opacity: 1 },
    leave: { transform: 'scale(1.2)', opacity: 0 },
    config: {
      mass: 0.5,
      tension: 210,
      friction: 20
    },
  })

  const animationDone = useTransition(isSubmit, {
    from: { transform: 'scale(1.2)', opacity: 0 },
    enter: { transform: 'scale(1)', opacity: 1 },
    leave: { transform: 'scale(1.2)', opacity: 0 },
    config: config.stiff,
  })

  return <>
    {animation((styles, item) =>
      item && <animated.div style={styles} className={classnames('call-to-action action', { 'active': active })}>

        {isSubmit && confettiRender()}
        
        <div onClick={() => setCallToAction(false)} className="action__back"></div>
        <div className="action__content">

          <div onClick={() => setCallToAction(false)} className="action__close"><X /></div>

          <div className="action__image">
            <img src='/callToAction.jpeg' alt="Стань партнером прямо сейчас" />
          </div>

          <div className="action__text">
            <h3 className="action__title">Стать нашим партнером прямо сейчас!</h3>
            <ul className="action__list">
              <li>Свободный рынок</li>
              <li>Премиальная уникальная продукция</li>
              <li>Нет обязательных ежемесячных закупок</li>
              <li>Несгорамемые квалификации</li>
              <li>Щедрый маркетинг на высоких уровнях</li>
            </ul>

            {animationDone((styles, item) =>
              item && <animated.div style={styles} className="action__done">
                Поздравляем, вы начали свой путь к успеху!
              </animated.div>
            )}

            <CallbackForm 
              onSubmit={submitHandler}
              className={`action__form${isSubmit ? ' hide' : ''}`}
            />
            
          </div>
        </div>

      </animated.div>
    )}  
  </>
}
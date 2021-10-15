import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTransition, animated, config } from '@react-spring/web'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'react-feather'
import Confetti from 'react-confetti'
import { Button, Input } from './generetic'
import { useTypesSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import classnames from '../utils/classnames'
import { getCookie, setCookie } from '../utils/helper'
import { callToActionSchema } from '../utils/validationSchemas'
import authAxios from '../services/axiosService'

interface FormInputs {
  name: string
  email: string
}

export const CallToActionPopup: FC = () => {
  
  const { setCallToAction } = useActions()
  const { callToAction: active } = useTypesSelector(state => state.help)
  const [isSubmit, setIsSubmit] = useState(false)
  
  const form = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(callToActionSchema)
  })

  const submitHandler = form.handleSubmit(async data => {
    // const { data: d } = await authAxios.post('/mails/mail-partner', data)
    // if (!d.success) return
    // setCookie('ispartner', true, 15)
    // setIsSubmit(true)
    // form.reset()
  })

  // const timeout = () => {
  //   const isPartner = getCookie('ispartner')
  //   if (!isPartner) {
  //     setTimeout(() => {
  //       !active ? setCallToAction(true) : null
  //     }, 2*60*1000)
  //   }
  // }

  // useEffect(() => {
  //   timeout()
  //   document.body.style.overflow = active ? 'hidden' : 'auto'
  //   if (!active && isSubmit) setIsSubmit(false)
  // }, [active])
  
  // useEffect(() => {
  //   timeout()
  // }, [])

  const confettiRender = () => {
    const h = window.innerHeight
    const w = window.innerWidth
    return <Confetti width={w} height={h} />
  }

  const animation = useTransition(active, {
    from: { transform: 'scale(0.8)', opacity: 0 },
    enter: { transform: 'scale(1)', opacity: 1 },
    leave: { transform: 'scale(0.8)', opacity: 0 },
    config: config.stiff,
  })

  const animationDone = useTransition(isSubmit, {
    from: { transform: 'scale(0.8)', opacity: 0 },
    enter: { transform: 'scale(1)', opacity: 1 },
    leave: { transform: 'scale(0.8)', opacity: 0 },
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

            <form onSubmit={submitHandler} className={`action__form${isSubmit ? ' hide' : ''}`}>
              <Input 
                name='name'
                register={form.register}
                error={form.formState.errors.name}
                touched={form.formState.touchedFields.name}
                placeholder='Ваше имя'
              />
              <Input 
                name='email'
                register={form.register}
                error={form.formState.errors.email}
                touched={form.formState.touchedFields.email}
                placeholder='Ваша почта'
              />
              <Button>Стать партнером</Button>
            </form>
            
          </div>
        </div>

      </animated.div>
    )}  
  </>
}
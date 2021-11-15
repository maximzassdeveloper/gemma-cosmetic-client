import { FC, ReactNode, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Input, Button, Checkbox } from './generetic'
import { callToActionSchema } from '../utils/validationSchemas'
import authAxios from '../services/axiosService'
import classnames from '../utils/classnames'

interface CallbackFormProps {
  onSubmit?: (data: FormInputs) => void
  className?: string
  before?: ReactNode
}

interface FormInputs {
  name: string
  email: string
}

export const CallbackForm: FC<CallbackFormProps> = ({ className, before, onSubmit }) => {

  const [personal, setPersonal] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(callToActionSchema)
  })

  const submitHandler = form.handleSubmit(async data => {
    if (!personal) return
    const { data: d } = await authAxios.post('/mails/mail-partner', data)
    if (!d.success) return

    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 5000)

    onSubmit(data)
    form.reset()
  })

  return (
    <form   
      className={classnames('callback-form', className, { 'success': isSuccess })} 
      onSubmit={submitHandler}
    >
      {before}
      <Input 
        name='name'
        register={form.register}
        error={form.formState.errors.name}
        touched={form.formState.touchedFields.name}
        placeholder='Имя'
      />
      <Input 
        name='email'
        register={form.register}
        error={form.formState.errors.email}
        touched={form.formState.touchedFields.email}
        placeholder='Почта'
      />
      <Checkbox 
        name='personal'
        onChange={e => setPersonal(e.target.checked)}
      >
        Согласие на обработку персональных данных
      </Checkbox>
      <Button>Станьте партнёром</Button>

      <CSSTransition in={isSuccess} classNames="fade" timeout={200} mountOnEnter unmountOnExit>
        <div className="callback-form__success">
          Заявка успешко отправлена. Мы скоро вам напишем!
        </div>
      </CSSTransition> 
    </form>
  )
}
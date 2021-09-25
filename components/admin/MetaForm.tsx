import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Input } from '../generetic'

interface MetaFormProps {
  register: UseFormRegister<any>
}

export const MetaForm: FC<MetaFormProps> = ({ register }) => {
  return (
    <div className="form-meta">
      <Input 
        name='metaTitle'
        register={register}
        placeholder='Мета Заголовок'
      />
      <Input 
        name='metaDesc'
        register={register}
        placeholder='Мета Описание'
      />
      <Input 
        name='metaRobots'
        register={register}
        placeholder='Мета Robots'
      />
      <Input 
        name='metaKeywords'
        register={register}
        placeholder='Мета Keywords'
      />
    </div>
  )
}
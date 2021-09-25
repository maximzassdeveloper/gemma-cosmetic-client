import { NextPage } from 'next'
import authAxios from '../../../services/axiosService'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { AdminMain } from '../../../components/hoc'
import { Input, Button } from '../../../components/generetic'
import { MetaForm } from '../../../components/admin'
import { CreateTags } from '../../../components/admin/widgets'

const Editor = dynamic(() => import('../../../components/generetic/Editor')
  .then(m => m.Editor), { ssr: false })

interface FormInputs {
  name: string
  slug: string
  body: any
  metaTitle?: string
  metaDesc?: string
  metaRobots?: string
  metaKeywords?: string
  tags?: string[]
}

const CreatePagePage: NextPage = () => {

  const { 
    register, 
    handleSubmit,
    setValue,
    getValues,
    formState: { touchedFields, errors } 
  } = useForm<FormInputs>()

  const onSubmit = handleSubmit(async data => {
    if (!getValues('body')) return
    await authAxios.post(`/pages/create`, {...data, body: JSON.stringify(data.body)})
  })

  return (
    <AdminMain>

      <form onSubmit={onSubmit}>
        <Input 
          name='name'
          register={register}
          rules={{ required: true }}
          error={errors.name}
          touched={touchedFields.name}
          placeholder='Название страницы'
        />
        <Input 
          name='slug'
          register={register}
          rules={{ required: true }}
          error={errors.slug}
          touched={touchedFields.slug}
          placeholder='Слаг страницы'
        />
        <MetaForm register={register} />
        <Editor onChange={d => setValue('body', d)} />
        <CreateTags
          onChange={t => setValue('tags', t)}
        />
        <Button type='submit'>Создать</Button>
      </form>

    </AdminMain>
  )
}

export default CreatePagePage
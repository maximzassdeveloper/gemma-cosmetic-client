import { GetServerSideProps, NextPage } from 'next'
import authAxios from '../../../services/axiosService'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { AdminMain } from '../../../components/hoc'
import { Input, Button } from '../../../components/generetic'
import { fetchData } from '../../../services/dataService'
import { IPage } from '../../../types/help'
import { CreateTags } from '../../../components/admin/widgets'
import { MetaForm } from '../../../components/admin'

const Editor = dynamic(() => import('../../../components/generetic/Editor')
  .then(m => m.Editor), { ssr: false })

interface UpdatePageProps {
  page: IPage
}

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

const UpdatePagePage: NextPage<UpdatePageProps> = ({ page }) => {

  const { 
    register, 
    handleSubmit,
    setValue,
    getValues,
    formState: { touchedFields, errors } 
  } = useForm<FormInputs>({
    defaultValues: {
      name: page.name,
      slug: page.slug,
      metaTitle: page.metaTitle,
      metaDesc: page.metaDesc,
      metaKeywords: page.metaKeywords,
      metaRobots: page.metaRobots,
      body: page.body,
      tags: page.tags
    }
  })

  const onSubmit = handleSubmit(async data => {
    if (!getValues('body')) return
    await authAxios.put(`/pages/update/${page.id}`, {...data, body: JSON.stringify(data.body)})
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
          placeholder='Слаг страницы'
        />
        <MetaForm register={register} />
        <Editor 
          data={JSON.parse(page.body) || {}} 
          onChange={d => setValue('body', d)} 
        />
        <CreateTags 
          onChange={t => setValue('tags', t)}
          tags={page.tags} 
        />
        <Button type='submit'>Обновить</Button>
      </form>

    </AdminMain>
  )
}

export default UpdatePagePage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const page = await fetchData(`/pages/page/${params?.slug}`)
  if (!page) return { notFound: true }

  return { props: { page } }
}
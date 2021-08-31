import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CreateAttrValues } from '../../../components/admin/widgets'
import { Button, Input } from '../../../components/generetic'
import { AdminMain } from '../../../components/hoc'
import authAxios from '../../../services/axiosService'

interface IValue {
  name: string
  slug?: string
}

interface FormInputs {
  name: string
  slug?: string
  values: IValue[]
}

const CrateAttrPage: NextPage = () => {

  const { 
    register, 
    setValue,
    handleSubmit, 
    formState: { errors, touchedFields } 
  } = useForm<FormInputs>() 
  const router = useRouter()

  const valuesChange = (data: IValue[]) => {
    setValue('values', data)
  }

  const onSubmit = handleSubmit(async data => {
    try {
      await authAxios.post('/attributes/create', data)
      router.push('/admin/attributes')
    } catch {}
  })

  return (
    <AdminMain>
      <form onSubmit={onSubmit}>
        <Input 
          name='name'
          register={register}
          error={errors.name}
          touched={touchedFields.name}
          rules={{ required: true }}
          placeholder='Название'
        />
        <Input 
          name='slug'
          register={register}
          error={errors.slug}
          touched={touchedFields.slug}
          placeholder='Слаг'
        />
        <Button>Создать</Button>
      </form>
      <CreateAttrValues onChange={d => valuesChange(d)} />
    </AdminMain>
  )
}

export default CrateAttrPage
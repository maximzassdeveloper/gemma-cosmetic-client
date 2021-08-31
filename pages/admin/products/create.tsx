import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { AdminMain } from '../../../components/hoc'
import { CreateSidebar } from '../../../components/admin'
import { CreateCategoryWidget, ProductAttributes } from '../../../components/admin/widgets'
import { IAttribute } from '../../../types/product'
import { Button, Input, Textarea, FileUpload } from '../../../components/generetic'
import authAxios from '../../../services/axiosService'

interface FormInputs {
  name: string
  slug?: string
  price: number
  shortDesc?: string
  desc?: string
  categories?: string[]
  attributes?: IAttribute[]
  img?: File[]
}

const CreateProductPage: NextPage = () => {

  const { 
    register, 
    handleSubmit,
    setValue,
    formState: { touchedFields, errors } 
  } = useForm<FormInputs>()

  const onSubmit = handleSubmit(async data => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('slug', data.slug || '')
    formData.append('price', data.price.toString())
    formData.append('desc', data.desc || '')
    formData.append('shortDesc', data.shortDesc || '')
    formData.append('categories', data.categories?.join(',') || '')
    formData.append('attributes', JSON.stringify(data.attributes))
    if (data.img) {
      data.img.forEach((i, index) => formData.append(`img${index}`, i))
    }

    await authAxios.post(`/products/create`, formData)
    console.log(data)
  })

  return (
    <AdminMain>

      <form onSubmit={onSubmit}>
        <Input 
          name='name'
          register={register}
          rules={{ required: true }}
          placeholder='Название товара'
        />
        <Input 
          name='slug'
          register={register}
          placeholder='Слаг товара'
        />
        <Input 
          name='price'
          type='number'
          register={register}
          rules={{ required: true }}
          placeholder='Цена'
        />
        <Textarea 
          name='desc'
          register={register}
          placeholder='Описание товара'
        />
        <Textarea 
          name='shortDesc'
          register={register}
          placeholder='Краткое описание товара'
        />
        <FileUpload  
          onChange={f => setValue('img', f)}
          name='newproduct-image' 
          multiple 
        />
        <Button type='submit'>Создать</Button>
      </form>

      <CreateSidebar>
        <CreateCategoryWidget 
          onChange={a => setValue('categories', a)}
        />  
        <ProductAttributes />
      </CreateSidebar>

    </AdminMain>
  )
}

export default CreateProductPage
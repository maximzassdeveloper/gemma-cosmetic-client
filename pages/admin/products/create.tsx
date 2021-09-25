import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { AdminMain } from '../../../components/hoc'
import { CreateSidebar, MetaForm } from '../../../components/admin'
import { CreateCategoryWidget, CreateTags, ProductAttributes } from '../../../components/admin/widgets'
import { IProductAttribute } from '../../../types/product'
import { Button, Input, Textarea, FileUpload } from '../../../components/generetic'
import authAxios from '../../../services/axiosService'

const Editor = dynamic(() => import('../../../components/generetic/Editor')
  .then(m => m.Editor), { ssr: false })

interface FormInputs {
  name: string
  slug?: string
  price: number
  shortDesc?: string
  desc?: any
  categories?: string[]
  attributes?: IProductAttribute[]
  img: File[]
  tags?: string[]
  metaTitle?: string
  metaDesc?: string
  metaKeywords?: string
  metaRobots?: string
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
    formData.append('metaDesc', data.metaDesc || '')
    formData.append('metaTitle', data.metaTitle || '')
    formData.append('metaKeywords', data.metaKeywords || '')
    formData.append('metaRobots', data.metaRobots || '')
    formData.append('price', data.price.toString())
    formData.append('desc', JSON.stringify(data.desc) || '')
    formData.append('tags', JSON.stringify(data.tags || []))
    formData.append('shortDesc', data.shortDesc || '')
    if (data.categories) {
      formData.append('categories', data.categories.join(',') || '')
    }
    if (data.attributes) {
      formData.append('attributes', data.attributes.reduce((t, x, i, a) => {
        return t + String(x.id) + (i === a.length-1 ? '' : ',')
      }, ''))
    }
    if (data.img) {
      data.img.forEach((i, index) => formData.append(`img${index}`, i))
    }

    await authAxios.post(`/products/create`, formData)
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
        <Editor onChange={d => setValue('desc', d)} />
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
        <CreateTags 
          onChange={t => setValue('tags', t)}
        />
        <Button type='submit'>Создать</Button>
      </form>

      <CreateSidebar>
        <CreateCategoryWidget 
          onChange={a => setValue('categories', a)}
        />  
        <ProductAttributes 
          // attributes={product.attribute_values}
          onChange={d => setValue('attributes', d)} 
        />
        <MetaForm register={register} />
      </CreateSidebar>

    </AdminMain>
  )
}

export default CreateProductPage
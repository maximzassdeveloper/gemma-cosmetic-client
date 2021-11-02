import { NextPage, GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'
import { AdminMain } from '../../../components/hoc'
import { CreateSidebar, MetaForm } from '../../../components/admin'
import { CreateCategoryWidget, CreateTags, ProductAttributes } from '../../../components/admin/widgets'
import { IProduct, IProductAttribute } from '../../../types/product'
import { Button, Input, Textarea, FileUpload } from '../../../components/generetic'
import authAxios from '../../../services/axiosService'
import { fetchData } from '../../../services/dataService'
import dynamic from 'next/dynamic'

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
  metaTitle?: string
  metaDesc?: string
  metaRobots?: string
  metaKeywords?: string
  tags?: string[]
}

interface Props {
  product: IProduct
}

const AdminSingleProductPage: NextPage<Props> = ({ product }) => {

  const { 
    register, 
    handleSubmit,
    setValue,
    getValues,
    formState: { touchedFields, errors } 
  } = useForm<FormInputs>({
    defaultValues: {
      name: product.name,
      slug: product.slug,
      price: product.price,
      metaTitle: product.metaTitle || '',
      metaDesc: product.metaDesc || '',
      metaKeywords: product.metaKeywords || '',
      metaRobots: product.metaRobots || '',
      shortDesc: product.shortDesc || '',
      desc: product.desc ? JSON.parse(product.desc) : '',
      categories: product.categories?.map(i => i.name) || [],
      attributes: product.attribute_values || [],
      tags: product.tags || [] 
    }
  })

  const onSubmit = handleSubmit(async data => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('slug', data.slug || '')
    formData.append('metaTitle', data.metaTitle || '')
    formData.append('metaDesc', data.metaDesc || '')
    formData.append('metaKeywords', data.metaKeywords || '')
    formData.append('metaRobots', data.metaRobots || '')
    formData.append('price', data.price.toString())
    formData.append('desc', JSON.stringify(data.desc || ''))
    formData.append('shortDesc', data.shortDesc || '')
    formData.append('tags', JSON.stringify(data.tags || []))
    formData.append('categories', data.categories?.join(',') || '')
    if (data.attributes) {
      formData.append('attributes', data.attributes.reduce((t, x, i, a) => {
        return t + String(x.id) + (i === a.length-1 ? '' : ',')
      }, ''))
    }
    if (data.img) {
      data.img.forEach((i, index) => formData.append(`img${index}`, i))
    }

    await authAxios.put(
      `/products/update/${product.id}`,
      formData
    )
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
        <Editor 
          data={getValues('desc')}
          onChange={d => setValue('desc', d)} 
        />
        <Textarea 
          name='shortDesc'
          register={register}
          placeholder='Краткое описание товара'
        />
        <FileUpload  
          initial={product.images}
          onChange={f => setValue('img', f)}
          name='newproduct-image' 
          multiple 
        />
        <CreateTags 
          tags={product.tags}
          onChange={t => setValue('tags', t)}
        />
        <Button type='submit'>Обновить</Button>
      </form>

      <CreateSidebar>
        <CreateCategoryWidget 
          productCategories={product.categories}
          onChange={a => setValue('categories', a)}
        />  
        <ProductAttributes 
          attributes={product.attribute_values}
          onChange={d => setValue('attributes', d)} 
        />
        <MetaForm register={register} />
      </CreateSidebar>

    </AdminMain>
  )
}

export default AdminSingleProductPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const product = await fetchData(`/products/product/` + params?.slug)
  if (!product) return { notFound: true }

  return { props: { product } }
}
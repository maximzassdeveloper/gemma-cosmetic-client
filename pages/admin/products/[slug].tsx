import { NextPage, GetServerSideProps } from 'next'
import { useForm } from 'react-hook-form'
import { AdminMain } from '../../../components/hoc'
import { CreateSidebar } from '../../../components/admin'
import { CreateCategoryWidget, ProductAttributes } from '../../../components/admin/widgets'
import { IAttribute, IProduct, IProductAttribute } from '../../../types/product'
import { Button, Input, Textarea, FileUpload } from '../../../components/generetic'
import authAxios from '../../../services/axiosService'
import axios from 'axios'
import { fetchData } from '../../../services/dataService'

interface FormInputs {
  name: string
  slug?: string
  price: number
  shortDesc?: string
  desc?: string
  categories?: string[]
  attributes?: IProductAttribute[]
  img?: File[]
}

interface Props {
  product: IProduct
}

const AdminSingleProductPage: NextPage<Props> = ({ product }) => {

  const { 
    register, 
    handleSubmit,
    setValue,
    formState: { touchedFields, errors } 
  } = useForm<FormInputs>({
    defaultValues: {
      name: product.name,
      slug: product.slug,
      price: product.price,
      categories: product.categories?.map(i => i.name) || [],
      attributes: product.attribute_values || []
    }
  })

  const onSubmit = handleSubmit(async data => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('slug', data.slug || '')
    formData.append('price', data.price.toString())
    formData.append('desc', data.desc || '')
    formData.append('shortDesc', data.shortDesc || '')
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
          initial={product.images}
          onChange={f => setValue('img', f)}
          name='newproduct-image' 
          multiple 
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
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { AdminList } from '../../../components/admin'
import { AdminMain } from '../../../components/hoc'
import authAxios from '../../../services/axiosService'

const options = [
  { name: 'id', slug: 'id' },
  { name: 'Имя', slug: 'name' }
]

const CategoriesPage: NextPage = () => {

  const [cats, setCats] = useState([])

  useEffect(() => {
    const getAttrs = async () => {
      try {
        const { data } = await authAxios.get('/categories')
        setCats(data)
      } catch {}
    }
    getAttrs()
  }, [])

  const deleteCat = async (id: number) => {
    try {
      await authAxios.delete(`/categories/delete/${id}`)
      setCats(cats.filter(x => x.id !== id))
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <AdminMain>
      <AdminList 
        options={options}
        items={cats}
        link={'/admin/categories'}
        linkOption={'slug'}
        onDelete={id => deleteCat(id)}
      />
    </AdminMain>
  )
}

export default CategoriesPage
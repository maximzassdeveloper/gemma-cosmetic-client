import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { AdminList } from '../../../components/admin'
import { AdminMain } from '../../../components/hoc'
import authAxios from '../../../services/axiosService'

const options = [
  { name: 'id', slug: 'id' },
  { name: 'Имя', slug: 'name' },
  { name: 'Ссылка', slug: 'slug' }
]

const PagesAdminPage: NextPage = () => {

  const [pages, setPages] = useState([])

  useEffect(() => {
    const getPages = async () => {
      try {
        const { data } = await authAxios.get('/pages')
        setPages(data)
      } catch {}
    }
    getPages()
  }, [])

  const deletePage = async (id: number) => {
    try {
      await authAxios.delete(`/pages/delete/${id}`)
      setPages(pages.filter(x => x.id !== id))
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <AdminMain>
      <AdminList 
        options={options}
        items={pages}
        link={'/admin/pages'}
        linkOption={'slug'}
        onDelete={id => deletePage(id)}
      />
    </AdminMain>
  )
}

export default PagesAdminPage
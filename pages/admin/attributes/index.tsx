import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { AdminList } from '../../../components/admin'
import { AdminMain } from '../../../components/hoc'
import authAxios from '../../../services/axiosService'

const options = [
  { name: 'id', slug: 'id' },
  { name: 'Имя', slug: 'name' }
]

const AttributesPage: NextPage = () => {

  const [attrs, setAttrs] = useState([])

  useEffect(() => {
    const getAttrs = async () => {
      const { data } = await authAxios.get('/attributes')
      setAttrs(data)
    }
    getAttrs()
  }, [])

  return (
    <AdminMain>
      <AdminList 
        options={options}
        items={attrs}
        link={'/admin/attributes'}
        linkOption={'id'}
      />
    </AdminMain>
  )
}

export default AttributesPage
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { AdminList } from '../../../components/admin'
import { AdminMain } from '../../../components/hoc'
import authAxios from '../../../services/axiosService'

const options = [
  { name: 'id', slug: 'id' },
  { name: 'Имя', slug: 'name' },
  { name: 'id товара', slug: 'productId' },
  { name: 'id автора', slug: 'userId' },
]

const CommentsAdminPage: NextPage = () => {

  const [comments, setComments] = useState([])

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await authAxios.get('/comments')
        setComments(data)
      } catch {}
    }
    getComments()
  }, [])

  const deleteComment = async (id: number) => {
    try {
      await authAxios.delete(`/comments/delete/${id}`)
      setComments(comments.filter(x => x.id !== id))
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <AdminMain>
      <AdminList 
        options={options}
        items={comments}
        link={'/admin/categories'}
        linkOption={'slug'}
        onDelete={id => deleteComment(id)}
      />
    </AdminMain>
  )
}

export default CommentsAdminPage
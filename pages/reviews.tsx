import { NextPage, GetServerSideProps } from 'next'
import { Container, Main } from '../components/hoc'
import { CommentItem } from '../components/Comment/CommentItem'
import { fetchData } from '../services/dataService'
import { IComment } from '../types/product'

interface CommentsPageProps {
  comments: IComment[]
}

const CommentsPage: NextPage<CommentsPageProps> = ({ comments }) => {
  return (
    <Main>
      <Container>
        <div className="comments-list page">
          <h1 className="title">Отзывы</h1>
          {!comments.length && <p>Отзывов нет</p>}
          {!!comments.length && comments.map(com => 
            <CommentItem key={com.id} comment={com} />
          )}
        </div>
      </Container>
    </Main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const comments = await fetchData(`/comments`)
  if (!comments) return { notFound: true }

  return { props: { comments } }
}

export default CommentsPage
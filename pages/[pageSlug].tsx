import { NextPage, GetServerSideProps } from 'next'
import { Container, Main } from '../components/hoc'
import { fetchData } from '../services/dataService'
import { IPage } from '../types/help'
import { TagList } from '../components'
import { editorRender } from '../utils/helper'

interface Props {
  page: IPage
}

const Page: NextPage<Props> =({ page }) => {
  return (
    <Main 
      description={page.metaDesc} 
      title={page.name}
      keywords={page.metaKeywords}
      robots={page.metaRobots}
    >
      
      <Container>
        <div className="page notfull">
          <h1>{page.name}</h1>

          {page.body && <div className="editor-styles">
            {editorRender(page.body)}
          </div>}
          <TagList tags={page.tags} />
        </div>
      </Container>
    </Main>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const page = await fetchData(`/pages/page/` + params?.pageSlug)
  if (!page) return { notFound: true }

  return { props: { page } }
}
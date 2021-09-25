import { NextPage, GetServerSideProps } from 'next'
import editorParser from 'editorjs-html'
import htmlParser from 'html-react-parser'
import { Container, Main } from '../components/hoc'
import { fetchData } from '../services/dataService'
import { IPage } from '../types/page'
import { TagList } from '../components'

interface Props {
  page: IPage
}

const Page: NextPage<Props> =({ page }) => {

  function ownImageParser({ data }){
    const r = data.file.url.split('.')[1]
    const videoArr = ['mp4', 'avi', 'mov']
    if (videoArr.includes(r)) {
      return `<video src="${data.file.url}" controlslist="nodownload" controls alt="${data.caption}"></video>`
    } else {
      return `<img src="${data.file.url}" alt="${data.caption}" />`
    }
  }

  const renderBody = () => {
    try {
      const edjsParser = editorParser({ image: ownImageParser })
      const html = edjsParser.parse(JSON.parse(page.body))
      return htmlParser(html.join(''))
    } catch(e) {
      console.log(e)
    }
  }

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
            {renderBody()}
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
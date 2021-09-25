export interface IPage {
  id: number
  name: string
  slug: string
  body: string
  metaDesc?: string
  metaTitle?: string
  metaKeywords?: string
  metaRobots?: string
  tags: string[]
}
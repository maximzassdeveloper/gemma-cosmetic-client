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

// Redux

export interface PageState {
  pages: IPage[]
}

export enum PageActionTypes {
  GET_PAGES = 'GET_PAGES'
}

export interface GetPagesAction {
  type: PageActionTypes.GET_PAGES
  payload: IPage[]
}

export type PageAction = GetPagesAction
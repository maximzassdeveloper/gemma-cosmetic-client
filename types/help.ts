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

export interface HelpState {
  pages: IPage[]
  callToAction: boolean
}

export enum HelpActionTypes {
  GET_PAGES = 'GET_PAGES',
  SET_CALL_TO_ACTION = 'SET_CALL_TO_ACTION'
}

export interface GetPagesAction {
  type: HelpActionTypes.GET_PAGES
  payload: IPage[]
}

export interface SetCallToActionAction {
  type: HelpActionTypes.SET_CALL_TO_ACTION
  payload: boolean
}

export type HelpAction = GetPagesAction | SetCallToActionAction
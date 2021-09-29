import { PageState, PageAction, PageActionTypes } from '../../types/page'

const initialState: PageState = {
  pages: []
}

export const pageReducer = (state = initialState, action: PageAction): PageState => {
  switch(action.type) {
    case PageActionTypes.GET_PAGES:
      return { ...state, pages: action.payload }
    default:
      return state
  }
}
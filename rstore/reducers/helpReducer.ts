import { HelpState, HelpAction, HelpActionTypes } from '../../types/help'

const initialState: HelpState = {
  pages: [],
  callToAction: false
}

export const helpReducer = (state = initialState, action: HelpAction): HelpState => {
  switch(action.type) {
    case HelpActionTypes.GET_PAGES:
      return { ...state, pages: action.payload }
    case HelpActionTypes.SET_CALL_TO_ACTION:
      return { ...state, callToAction: action.payload }
    default:
      return state
  }
}
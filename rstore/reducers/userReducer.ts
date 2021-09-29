import { IUser, UserAction, UserActionsTypes, UserState } from '../../types/user'

const initialState: UserState = {
  user: {} as IUser,
  isAuth: false,
  loading: false,
  error: ''
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionsTypes.REGISTER:
      return { ...state, loading: true }
    case UserActionsTypes.REGISTER_SUCCESS:
      return { ...state, user: action.payload.user, loading: false, isAuth: true, error: '' }
    case UserActionsTypes.REGISTER_ERROR:
      return { ...state, loading: false, error: action.payload }
    
    case UserActionsTypes.LOGIN:
      return { ...state, loading: true }
    case UserActionsTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, loading: false, isAuth: true, error: '' }
    case UserActionsTypes.LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload }

    case UserActionsTypes.CLEAN_ERROR:
      return { ...state, error: '' }

    case UserActionsTypes.REFRESH:
      return { ...state, user: action.payload.user, isAuth: true, error: '' }
    case UserActionsTypes.LOGOUT:
      return { ...state, user: {} as IUser, isAuth: false, error: '' }

    default:
      return state
  }
}
import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { productReducer } from './productReducer'
import { userReducer } from './userReducer'
import { pageReducer } from './pageReducer'

export const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  page: pageReducer
})

export type RootState = ReturnType<typeof rootReducer>
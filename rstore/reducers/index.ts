import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { productReducer } from './productReducer'
import { userReducer } from './userReducer'

export const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>
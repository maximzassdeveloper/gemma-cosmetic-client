import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { productReducer } from './productReducer'
import { userReducer } from './userReducer'
import { helpReducer } from './helpReducer'

export const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  help: helpReducer
})

export type RootState = ReturnType<typeof rootReducer>
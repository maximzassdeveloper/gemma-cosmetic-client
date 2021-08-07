import { createContext, useContext } from 'react'
import { UserStore } from './userStore'
import { ProductStore } from './productStore'
import { CartStore } from './cartStore'
import { StoreProvider } from './storeProvider'

interface IStoreContext {
  userStore: UserStore
  cartStore: CartStore
  productStore: ProductStore
}

export const storeState: IStoreContext = {
  cartStore: new CartStore(),
  userStore: new UserStore(),
  productStore: new ProductStore()
}

export const storeContext = createContext<IStoreContext>(storeState)
export const useStores = () => useContext<IStoreContext>(storeContext)
export { StoreProvider }
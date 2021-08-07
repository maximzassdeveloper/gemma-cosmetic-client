import { FC } from 'react'
import { storeContext, useStores } from '.'

export const StoreProvider: FC = ({ children }) => {

  const store = useStores()

  return (
    <storeContext.Provider value={store}>
      {children}
    </storeContext.Provider>
  )
}
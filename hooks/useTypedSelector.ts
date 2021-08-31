import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../rstore/reducers'

export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector
import { ProductAction, ProductState, ProductActionTypes } from '../../types/product'

const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
  error: ''
}

export const productReducer = (state = initialState, action: ProductAction): ProductState => {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCTS:
      return { ...state, loading: true }
    case ProductActionTypes.GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload }
    case ProductActionTypes.GET_PRODUCTS_ERROR:
      return {  ...state, loading: false, error: action.payload }   
    case ProductActionTypes.DELETE_PRODUCT:
      const newProducts = state.products.filter(x => x.id !== action.payload)
      return {  ...state, products: newProducts }  

    case ProductActionTypes.GET_CATS:
      return { ...state, loading: true }
    case ProductActionTypes.GET_CATS_SUCCESS:
      return { ...state, loading: false, categories: action.payload }
    case ProductActionTypes.GET_CATS_ERROR:
      return {  ...state, loading: false, error: action.payload }  
    case ProductActionTypes.ADD_CATEGORY:
      if (action.payload) {
        return { ...state, categories: [...state.categories, action.payload]  }
      }
      return { ...state, error: 'Категория не добавлена' }

    default:
      return state
    
  }
}
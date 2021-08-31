import { CartAction, CartActionTypes, CartState, ICartProduct } from '../../types/cart'

const initialState: CartState = {
  products: [],
  count: 0,
  total: 0,
  active: false,
  loading: false
}

const calcTotalAndCount = (products: ICartProduct[]) => {
  let count = 0
  let total = 0
  products.forEach(x => {
    count += x.count
    total += x.totalPrice
  })
  return { total, count }
}

export const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.GET_CART:
      const getcart = calcTotalAndCount(action.payload)
      return { ...state, products: action.payload, count: getcart.count, total: getcart.total }

    case CartActionTypes.CLEAR_CART:
    return { ...state, products: [], count: 0, total: 0, active: false }

    case CartActionTypes.ADD_PRODUCT:
      const addedProducts = [...state.products, action.payload]
      return { ...state, products: addedProducts, count: state.count+1 }

    case CartActionTypes.DELETE_PRODUCT:
      const deletedProducts = state.products.filter(x => x.id !== action.payload)
      const deletecart = calcTotalAndCount(deletedProducts)
      return { ...state, products: deletedProducts, count: deletecart.count, total: deletecart.total } 
    
    case CartActionTypes.UPDATE_COUNT:
      const updatedProducts = state.products.map(x => {
        if (x.slug === action.payload.slug) {
          return { 
            ...x, 
            count: action.payload.count, 
            totalPrice:  action.payload.count * x.price
          }
        } 
        return x
      })
      const updatecart = calcTotalAndCount(updatedProducts)
      return { ...state, products: updatedProducts, count: updatecart.count, total: updatecart.total }
    
    case CartActionTypes.SET_ACTIVE:
      return { ...state, active: action.payload }

    default:
      return state
  }
}
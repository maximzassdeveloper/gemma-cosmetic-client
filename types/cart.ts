export interface ICartProduct {
  id: number
  name: string
  slug: string
  price: number
  totalPrice: number
  count: number
  image: string
}

export interface ICart {
  total: number
  count: number
  products: ICartProduct[]
}

// Redux

export interface CartState {
  products: ICartProduct[]
  count: number
  total: number
  active: boolean
  loading: boolean
}

export enum CartActionTypes {
  GET_CART = 'GET_CART',
  ADD_PRODUCT = 'ADD_PRODUCT',
  DELETE_CART_PRODUCT = 'DELETE_CART_PRODUCT',
  UPDATE_COUNT = 'UPDATE_COUNT',
  SET_ACTIVE = 'SET_ACTIVE',
  CLEAR_CART = 'CLEAR_CART'
}

export interface GetCartAction {
  type: CartActionTypes.GET_CART,
  payload: ICartProduct[]
}

export interface AddCartProductAction {
  type: CartActionTypes.ADD_PRODUCT,
  payload: ICartProduct
}

export interface DeleteCartProductAction {
  type: CartActionTypes.DELETE_CART_PRODUCT,
  payload: number
}

export interface UpdateCartProductAction {
  type: CartActionTypes.UPDATE_COUNT,
  payload: { count: number, slug: string }
}

export interface SetActiveCartAction {
  type: CartActionTypes.SET_ACTIVE,
  payload: boolean
}

export interface ClearCartAction {
  type: CartActionTypes.CLEAR_CART
}

export type CartAction = 
  GetCartAction
  | ClearCartAction
  | AddCartProductAction
  | DeleteCartProductAction
  | UpdateCartProductAction
  | SetActiveCartAction
export interface ICategory {
  id: number
  name: string
  slug: string
}

export interface IComment {
  id: number
  name: string
  message: string
  rating: number
  userId: number
  productId: number
  images?: string[]
  videos?: string[]
  product?: IProduct
}

export interface IAttribute {
  id: number
  name: string
  slug: string
  attribute_values: [{
    id: number
    name: string
    slug: string
  }]
}

export interface IProductAttribute {
  id: number
  name: string
  slug: string
  attribute: {
    id: number
    name: string
    slug: string
  }
}

export interface IFile {
  id: number
  url: string
  type: string
}

export interface IProduct {
  id: number
  name: string
  slug: string
  price: number
  shortDesc?: string
  desc?: any
  images: IFile[]
  categories?: ICategory[]
  attrs?: IProductAttribute[]
  comments?: IComment[]
  tags?: string[]
  metaTitle?: string
  metaDesc?: string
  metaRobots?: string
  metaKeywords?: string
}


// Redux
export interface ProductState {
  products: IProduct[]
  categories: ICategory[]
  loading: boolean
  error: string
}

export enum ProductActionTypes {
  GET_PRODUCTS = 'GET_PRODUCTS',
  GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
  GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR',
  DELETE_PRODUCT = 'DELETE_PRODUCT',

  GET_CATS = 'GET_CATS',
  GET_CATS_SUCCESS = 'GET_CATS_SUCCESS',
  GET_CATS_ERROR = 'GET_CATS_ERROR',
  ADD_CATEGORY = 'ADD_CATEGORY'
}

export interface GetProductsAction {
  type: ProductActionTypes.GET_PRODUCTS
}

export interface GetProductsSuccessAction {
  type: ProductActionTypes.GET_PRODUCTS_SUCCESS,
  payload: IProduct[]
}

export interface GetProductsErrorAction {
  type: ProductActionTypes.GET_PRODUCTS_ERROR
  payload: string
}

export interface DeleteProductAction {
  type: ProductActionTypes.DELETE_PRODUCT,
  payload: number
}


export interface GetCatsAction {
  type: ProductActionTypes.GET_CATS
}

export interface GetCatsSuccessAction {
  type: ProductActionTypes.GET_CATS_SUCCESS,
  payload: ICategory[]
}

export interface GetCatsErrorAction {
  type: ProductActionTypes.GET_CATS_ERROR
  payload: string
}
export interface AddCategory {
  type: ProductActionTypes.ADD_CATEGORY,
  payload: ICategory | null
}

export type ProductAction = 
  GetProductsAction 
  | GetProductsSuccessAction
  | GetProductsErrorAction
  | DeleteProductAction
  | GetCatsAction
  | GetCatsSuccessAction
  | GetCatsErrorAction
  | AddCategory
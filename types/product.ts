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
}

export interface IAttribute {
  id: number
  name: string
  slug: string
  values: [{
    id: number
    name: string
    slug: string
  }]
}

export interface IProduct {
  id: number
  name: string
  slug: string
  price: number
  shortDesc?: string
  desc?: string
  images: string[]
  categories?: ICategory[]
  attributes?: IAttribute[]
  comments?: IComment[]
}

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
  products: ICartProduct[]
}
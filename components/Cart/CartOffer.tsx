import { FC } from 'react'
import { Plus } from 'react-feather'
import Link from 'next/link'
import { IProduct } from '../../types/product'
import { Price } from '../Product'
import { useActions } from '../../hooks/useActions'
import { createCartProduct } from '../../utils/createData'

interface CartOfferProps {
  products: IProduct[]
}

export const CartOffer: FC<CartOfferProps> = ({ products }) => {

  const { addCartProduct } = useActions()

  if (!products || !products?.length) return null

  const addHandler = (product) => {
    addCartProduct(createCartProduct(product, 1))
  }

  return (
    <div className="cart__offer offer">
      <h3>Также рекомендуем купить</h3>

      <div className="offer__list">
        {!!products.length && products.map(product => 
          <div key={product.id} className="offer__item item">

            <div onClick={() => addHandler(product)} className="item__add"><Plus /></div>

            <div className="item__image">
              <Link href={`/product/${product.slug}`}>
                <img src={product.images[0].url} alt={product.name} /> 
              </Link>
            </div>

            <div className="item__info">
              <h4 className="item__name">{product.name}</h4>
              <Price price={product.price} />
            </div>

          </div>
        )}
      </div>

    </div>
  )
}
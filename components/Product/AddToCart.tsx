import { FC, useState, useEffect } from 'react'
import { Button } from '../generetic'
import { ChangeCount } from './ChangeCount'
import { createCartProduct } from '../../utils/createData'
import { IProduct } from '../../types/product'
import { useActions } from '../../hooks/useActions'
import { useTypesSelector } from '../../hooks/useTypedSelector'

interface AddToCartProps {
  className?: string
  product: IProduct
}

export const AddToCart: FC<AddToCartProps> = ({ className, product }) => {

  const { addCartProduct, setActiveCart, updateCartProduct } = useActions()
  const { products } = useTypesSelector(state => state.cart)
  const [count, setCount] = useState(1) 
  const [found, setFound] = useState(false)

  const addHandler = () => {
    addCartProduct(createCartProduct(product, count))
    setActiveCart(true)
  }

  const countChange = (c: number) => {
    setCount(c)
    if (found) {
      updateCartProduct(findProduct()?.slug || '', c)
    }
  }

  const findProduct = () => {
    return products.find(x => x.slug === product.slug)
  }

  useEffect(() => {
    const foundProduct = findProduct()
    if (foundProduct) {
      setFound(true)
      setCount(foundProduct.count)
    } else {
      setFound(false)
      setCount(1)
    }
  }, [products])

  return (
    <div className={`add-to-cart ${className || ''}`.trim()}>
      <ChangeCount 
        onChange={c => countChange(c)} 
        startCount={count} 
      />
      {found 
        ? <Button>Добавлен</Button>
        : <Button onClick={addHandler}>Купить</Button>
      }
    </div>
  )
}
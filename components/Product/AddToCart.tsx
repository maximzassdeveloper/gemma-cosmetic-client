import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../generetic'
import { ChangeCount } from './ChangeCount'
import { createCartProduct } from '../../utils/createData'
import { IProduct } from '../../types/product'
import { useActions } from '../../hooks/useActions'
import { useTypesSelector } from '../../hooks/useTypedSelector'
import { useMediaQuery } from '../../hooks/useMediaQuery'

interface AddToCartProps {
  className?: string
  product: IProduct
}

export const AddToCart: FC<AddToCartProps> = ({ className, product }) => {

  const { addCartProduct, setActiveCart, updateCartProduct } = useActions()
  const { products } = useTypesSelector(state => state.cart)
  const { isAuth } = useTypesSelector(state => state.user)
  const [count, setCount] = useState(1) 
  const [found, setFound] = useState(false)

  const [mobileClass, setMobileClass] = useState(false)
  const isMobile = useMediaQuery('(max-width: 600px)')

  const addHandler = () => {
    addCartProduct(createCartProduct(product, count))
    if (!isMobile) setActiveCart(true)
    else setMobileClass(!mobileClass)
  }

  const addedHandler = () => {
    if (isMobile) setMobileClass(!mobileClass)
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

  const genClasses = () => {
    return `add-to-cart ${className || ''} ${isMobile && mobileClass ? 'mobile' : ''}`.trim()
  }

  return (
    <div className={genClasses()}>
      <ChangeCount 
        onChange={c => countChange(c)} 
        startCount={count} 
      />
      {isAuth 
        ? found 
          ? <Button onClick={addedHandler}>Добавлен</Button>
          : <Button onClick={addHandler}>Купить</Button>
        : <Button><Link href='/login'>Купить</Link></Button>
      }
    </div>
  )
}
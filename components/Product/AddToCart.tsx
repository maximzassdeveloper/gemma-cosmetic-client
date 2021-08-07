import { FC, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from '../generetic'
import { ChangeCount } from './ChangeCount'
import { useStores } from '../../store'
import { createCartProduct } from '../../utils/createData'
import { IProduct } from '../../types/product'

interface AddToCartProps {
  className?: string
  product: IProduct
}

export const AddToCart: FC<AddToCartProps> = observer(({ className, product }) => {

  const { cartStore } = useStores()
  const [count, setCount] = useState(1) 
  const [found, setFound] = useState(false)

  const addHandler = () => {
    cartStore.addProduct(createCartProduct(product, count))
    cartStore.setActive(true)
  }

  const countChange = (c: number) => {
    setCount(c)
    if (found) {
      cartStore.updateProduct(findProduct()?.id || 0, c)
    }
  }

  const findProduct = () => {
    return cartStore.products.find(x => x.slug === product.slug)
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
  }, [cartStore.products])

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
})
import { FC, useState } from 'react'
import editorParser from 'editorjs-html'
import htmlParser from 'html-react-parser'
import { IComment, IProduct } from '../../types/product'
import { Price, AddToCart } from '../Product'
import { CommentList } from '../Comment/CommentList'
import { Rating } from '../Product/Rating'
import { SingleProductImages } from './SingleProductImages'
import { AttributeList } from './AttributeList'
import { CategoryList } from './CategoryList'
import { TagList } from '../'

interface SingleProductProps {
  product: IProduct
}

export const SingleProduct: FC<SingleProductProps> = ({ product }) => {

  const [productRating, setProductRating] = useState(calcRating(product.comments))
  
  function calcRating(comments?: IComment[]): number {
    if (!comments) return 0
    
    const rate = comments.reduce((t, i) => t + i.rating, 0)
    return Math.floor(rate / comments.length)
  }


  const renderDesc = () => {
    if (product.desc) {
      try {
        const edjsParser = editorParser()
        const html = edjsParser.parse(JSON.parse(product.desc))
        return htmlParser(html.join(''))
      } catch(e) {
        console.log(e)
      }
    }
  }

  return (
    <div className="single-product__wrapper">
      <div className="single-product">

        <div className="single-product__info">
          <Rating className="single-product__rating" rating={productRating} />

          <h1>{product.name}</h1>
          <Price className="single-product__price" price={product.price} />
          <AddToCart className="single-product__add" product={product} />
          <AttributeList attrs={product.attribute_values} />
          <CategoryList cats={product.categories} />
          {/* {product.shortDesc && <p className="single-product__short-desc">{product.shortDesc}</p>} */}
        </div>

        <SingleProductImages images={product.images} alt={product.name} />

      </div>
      {product.desc && <div className="single-product__desc editor-styles">
        {renderDesc()}
      </div>}
      <CommentList 
        productId={product.id} 
        comments={product.comments} 
        changeComments={c => setProductRating(calcRating(c))}
      />
      <TagList tags={product.tags} />
    </div>
  )
}
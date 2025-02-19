import * as React from 'react'
import classnames from 'classnames'

import ProductOrder from './product-order'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'

import { TOrderProducts } from '../../types/account'

interface StateProps {
  products: TOrderProducts;
}

const ProductsOrder = ({ products }: StateProps): JSX.Element => (
  <div
    className={
      classnames(
        managerOrder.listItems,
        utility.full
      )
    }
  >
    {
      products.map(function mapper (product, index): JSX.Element {
        return (
          <ProductOrder
            key={index}
            product={product}
          />
        )
      })
    }
  </div>
)

export default ProductsOrder

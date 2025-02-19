import * as React from 'react'
import classnames from 'classnames'

import ProductOrderRefund from '../order-refund-common/product-order-refund'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'

import { TOrderProducts } from '../../types/account'

import { VERSION_ID } from '../../redux/selector-consts'

interface StateProps {
  index: number;
  products: TOrderProducts;
}

const ProductsOrderRefund = ({ index, products }: StateProps): JSX.Element => (
  <div
    className={
      classnames(
        managerOrder.listItems,
        utility.full
      )
    }
  >
    {
      products.map(function mappwr (product): JSX.Element {
        return (
          <ProductOrderRefund
            key={product.get(VERSION_ID)}
            refundIndex={index}
            product={product}
          />
        )
      })
    }
  </div>
)

export default ProductsOrderRefund

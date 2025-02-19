import * as React from 'react'
import classnames from 'classnames'

import * as product from '../../styles/product.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  total: number;
}

const OrderTotalProduct = ({ total }: OwnProps): JSX.Element => {
  return total !== 0
    ? (
      <div
        className={
          classnames(
            product.productTotal,
            utility.df,
            utility.fdr,
            utility.jcsb
          )
        }
      >
        <div
          className={
            classnames(
              product.productTotalLabel,
              utility.bold
            )
          }
        >
          Product Total
        </div>

        <div
          className={
            classnames(
              product.productTotalResult,
              utility.bold
            )
          }
        >
          {
            new Intl.NumberFormat(
              'en-US', {
                style: 'currency',
                currency: 'USD'
              }
            ).format(total)
          }
        </div>
      </div>
    )
    : (<></>)
}

export default OrderTotalProduct

import * as React from 'react'
import classnames from 'classnames'

import * as priceCss from '../../styles/price.module.css'

const intlPrice = new Intl.NumberFormat(
  'en-US', {
    style: 'currency',
    currency: 'USD'
  }
)

const positionClasses: {
  [key: string]: string;
} = {
  product: priceCss.productOld,
  list: priceCss.listOld
}

interface OwnProps {
  position: 'product' | 'list';
  discount?: number;
  price: number;
}

function Price ({ price, discount, position }: OwnProps): JSX.Element {
  return discount
    ? (
      <div className={priceCss.priceDiscount}>
        <div
          className={
            classnames(
              priceCss.priceOld,
              positionClasses[position]
            )
          }
        >
          {
            intlPrice.format(price)
          }
        </div>

        <div
          className={
            classnames(
              priceCss.priceNew,
              positionClasses[position]
            )
          }
        >
          {
            intlPrice.format(
              price -
              price * (discount / 100)
            )
          }
        </div>
      </div>
    )
    : (
      <div>
        {
          intlPrice.format(price)
        }
      </div>
    )
}

export default React.memo(Price)

import * as React from 'react'
import classnames from 'classnames'

import * as price from '../../styles/price.module.css'

import { TProductVersion } from '../../types/static'

const intlPrice = new Intl.NumberFormat(
  'en-US', {
    style: 'currency',
    currency: 'USD'
  }
)

const positionClasses: {
  [key: string]: string | undefined;
} = {
  product: price.productOld,
  list: price.listOld
}

interface OwnProps {
  position: string;
  version: TProductVersion;
}

const Price = ({ version, position }: OwnProps): JSX.Element => {
  return version.discount
    ? (
      <div className={price.priceDiscount}>
        <div
          className={
            classnames(
              price.priceOld,
              positionClasses[position]
            )
          }
        >
          {
            intlPrice.format(
              parseFloat(version.price)
            )
          }
        </div>

        <div
          className={
            classnames(
              price.priceNew,
              positionClasses[position]
            )
          }
        >
          {
            intlPrice.format(
              parseFloat(version.price) -
              parseFloat(version.price) * (version.discount / 100)
            )
          }
        </div>
      </div>
    )
    : (
      <div>
        {
          intlPrice.format(
            parseFloat(version.price)
          )
        }
      </div>
    )
}

export default Price

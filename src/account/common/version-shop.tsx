import * as React from 'react'
import classnames from 'classnames'

import Price from '../../components/common/price'
import ButtonAddToCart from '../../components/common/button-add-to-cart'
import InputQuantityGoToCart from '../../components/common/input-quantity-go-to-cart'

import * as products from '../../styles/products.module.css'
import * as utility from '../../styles/utility.module.css'

import { TProductVersion } from '../../types/account'

import {
  SIZE,
  UNIT,
  PRICE,
  ID
} from '../../redux/selector-consts'

interface StateProps {
  value: number;
  discount: number;
  version: TProductVersion;
}

interface DispatchProps {
  addCartItem: React.MouseEventHandler;
  onChange(value: number): void;
}

const VersionShop = ({
  value,
  discount,
  version,
  // eslint-disable-next-line @getify/proper-arrows/params
  addCartItem,
  onChange
}: StateProps & DispatchProps): JSX.Element => (
  <div
    className={
      classnames(products.productItemVersion,
        utility.df,
        utility.jcsb,
        utility.aic
      )
    }
  >
    <div className={products.productItemWeight}>
      <div className={products.productItemWeightBadge}>
        { version.get(SIZE) }&nbsp;{ version.get(UNIT) }
      </div>
    </div>

    <div className={products.productItemPrice}>
      <Price
        position='product'
        discount={discount}
        price={version.get(PRICE)}
      />
    </div>

    <div className={products.productItemAddToCart}>
      {
        // eslint-disable-next-line @getify/proper-arrows/return
        value !== undefined
          ? (
            <InputQuantityGoToCart
              id={version.get(ID)}
              min={0}
              max={9999}
              value={value}
              onChange={onChange}
            />
          )
          : (
            <ButtonAddToCart
              onClick={addCartItem}
            />
          )
      }
    </div>
  </div>
)

export default VersionShop

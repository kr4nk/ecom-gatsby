import * as React from 'react'
import classnames from 'classnames'

import Price from '../../components/common/price'
import ButtonAddToCartProduct from '../../components/common/button-add-to-cart-product'
import InputQuantityGoToCart from '../../components/common/input-quantity-go-to-cart'

import * as product from '../../styles/product.module.css'
import * as utility from '../../styles/utility.module.css'

import { TProductVersion } from '../../types/account'

import {
  SIZE, UNIT, PRICE, ID
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

const VersionProduct = ({
  value = 0,
  discount,
  version,
  // eslint-disable-next-line @getify/proper-arrows/params
  addCartItem,
  onChange
}: StateProps & DispatchProps): JSX.Element => (
  <div
    className={
      classnames(
        product.productVersion,
        utility.df,
        utility.jcsb,
        utility.aic, {
          [product.versionSelected]: value > 0
        }
      )
    }
  >
    <div className={product.productWeight}>
      <div className={product.productWeightBadge}>
        { version.get(SIZE) }

        &nbsp;

        { version.get(UNIT) }
      </div>
    </div>

    <div className={product.productVersionPrice}>
      <Price
        position='product'
        discount={discount}
        price={version.get(PRICE)}
      />
    </div>

    <div className={product.productVersionAddToCartButton}>
      {
        // eslint-disable-next-line @getify/proper-arrows/return
        value > 0
          ? (
            <InputQuantityGoToCart
              id={version.get(ID)}
              min={0}
              max={1000}
              value={value}
              onChange={onChange}
            />
          )
          : (
            <ButtonAddToCartProduct
              onClick={addCartItem}
            />
          )
      }
    </div>
  </div>
)

export default VersionProduct

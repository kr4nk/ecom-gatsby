import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import LazyImage from '../../utils/lazyimage'
import { observer } from '../../utils/observer'

import SvgPlaceholder from '../../components/svg/placeholder'

import Price from '../../components/common/price'
import InputQuantityMax from '../../components/common/input-quantity-max'

import * as productsList from '../../styles/products-list.module.css'
import * as utility from '../../styles/utility.module.css'

import { BreakPoint } from '../../types/common'
import { TOrderProduct } from '../../types/account'

import {
  NAME,
  SLUG,
  IMAGES,
  BREAKPOINTS,
  MANUFACTURER_NAME,
  SIZE,
  UNIT,
  DISCOUNT,
  PRICE,
  VERSION_ID,
  QUANTITY,
  PURCHASE_PRICE,
  REFUNDED
} from '../../redux/selector-consts'

interface OwnProps {
  refundIndex: number;
  refundQuantity: number;
  product: TOrderProduct;
  onChange (value: number): void;
}

function ProductOrderRefund ({
  refundIndex,
  product,
  refundQuantity,
  onChange
}: OwnProps): JSX.Element {
  const breakpoints = React.useMemo(
    function setBreakpoints (): BreakPoint[] {
      const image = product.get(IMAGES).get(0)
      return image !== undefined ? image.get(BREAKPOINTS).toJS() : []
    }, [ product ]
  )

  return (
    <article className={productsList.itemProduct}>
      <Link
        title={`Product ${product.get(NAME)} ${product.get(MANUFACTURER_NAME)}`}
        to={`/account/product/${product.get(SLUG)}`}
      >
        {
          product.get(IMAGES).size > 0
            ? (
              <LazyImage
                observer={observer}
                className={productsList.itemThumb}
                breakpoints={breakpoints}
                title={`Image of the ${product.get(NAME)}`}
                alt={`Image of the ${product.get(NAME)}`}
              />
            )
            : (
              <div
                role='img'
                aria-label='Product image placeholder'
                className={productsList.itemThumb}
              >
                <SvgPlaceholder />
              </div>
            )
        }
      </Link>

      <div className={productsList.itemDetails}>
        <Link
          className={productsList.itemLink}
          to={`/account/product/${product.get(SLUG)}`}
        >
          <h4 className={productsList.itemTitle}>
            { product.get(NAME) }
          </h4>
        </Link>

        <div className={productsList.itemManufacturer}>
          { product.get(MANUFACTURER_NAME) }
        </div>

        <div
          className={
            classnames(
              productsList.itemTotals,
              utility.df,
              utility.aic
            )
          }
        >
          <div className={productsList.itemWeight}>
            <div className={productsList.itemWeightBadge}>
              { product.get(SIZE) }

              &nbsp;

              { product.get(UNIT) }
            </div>
          </div>

          <div className={productsList.itemPrice}>
            <Price
              position='list'
              discount={product.get(DISCOUNT)}
              price={product.get(PRICE)}
            />
          </div>

          <div className={productsList.times}>
            <span className={utility.roboto}>
              &times;
            </span>
          </div>

          {
            refundIndex !== -1
              ? (
                <div className={productsList.itemQuantity}>
                  { refundQuantity }
                </div>
              )
              : (
                <InputQuantityMax
                  id={product.get(VERSION_ID)}
                  min={0}
                  max={product.get(QUANTITY) - product.get(REFUNDED)}
                  value={refundQuantity}
                  onChange={onChange}
                />
              )
          }

          <div className={productsList.itemTotal}>
            <span className={productsList.itemTotalPrice}>
              {
                new Intl.NumberFormat(
                  'en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }
                ).format(
                  product.get(PURCHASE_PRICE) * refundQuantity
                )
              }
            </span>
          </div>
        </div>

        <div>
          <div>Ordered: { product.get(QUANTITY) }</div>
          <div>Refunded: { product.get(REFUNDED) }</div>
        </div>
      </div>
    </article>
  )
}

export default ProductOrderRefund

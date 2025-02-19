import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import LazyImage from '../../utils/lazyimage'
import { observer } from '../../utils/observer'

import SvgPlaceholder from '../../components/svg/placeholder'

import Price from '../../components/common/price'

import * as productList from '../../styles/products-list.module.css'
import * as utility from '../../styles/utility.module.css'

import { BreakPoint } from '../../types/common'
import { TOrderProduct } from '../../types/account'

import {
  NAME,
  MANUFACTURER_NAME,
  SLUG,
  IMAGES,
  BREAKPOINTS,
  SIZE,
  UNIT,
  DISCOUNT,
  PRICE,
  QUANTITY,
  PURCHASE_PRICE
} from '../../redux/selector-consts'

interface OwnProps {
  product: TOrderProduct;
}

function ProductOrder ({ product }: OwnProps): JSX.Element {
  const breakpoints = React.useMemo(
    function setBreakpoints (): BreakPoint[] {
      const image = product.get(IMAGES).get(0)
      return image !== undefined ? image.get(BREAKPOINTS).toJS() : []
    }, [ product ]
  )

  return (
    <article className={productList.itemProduct}>
      <Link
        title={`Product ${product.get(NAME)} ${product.get(MANUFACTURER_NAME)}`}
        to={`/account/product/${product.get(SLUG)}`}
      >
        {
          product.get(IMAGES).size > 0
            ? (
              <LazyImage
                observer={observer}
                className={productList.itemThumb}
                breakpoints={breakpoints}
                title={`Image of the ${product.get(NAME)}`}
                alt={`Image of the ${product.get(NAME)}`}
              />
            )
            : (
              <div
                role='img'
                aria-label='Product image placeholder'
                className={productList.itemThumb}
              >
                <SvgPlaceholder />
              </div>
            )
        }
      </Link>

      <div className={productList.itemDetails}>
        <Link
          className={productList.itemLink}
          to={`/account/product/${product.get(SLUG)}`}
        >
          <h4 className={productList.itemTitle}>
            { product.get(NAME) }
          </h4>
        </Link>

        <div className={productList.itemManufacturer}>
          { product.get(MANUFACTURER_NAME) }
        </div>

        <div
          className={
            classnames(
              productList.itemTotals,
              utility.df,
              utility.aic
            )
          }
        >
          <div className={productList.itemWeight}>
            <div className={productList.itemWeightBadge}>
              { product.get(SIZE) }

              &nbsp;

              { product.get(UNIT) }
            </div>
          </div>

          <div className={productList.itemPrice}>
            <Price
              position='list'
              discount={product.get(DISCOUNT)}
              price={product.get(PRICE)}
            />
          </div>

          <div className={productList.times}>
            <span className={utility.roboto}>
              &times;
            </span>
          </div>

          <div className={productList.itemQuantity}>
            { product.get(QUANTITY) }
          </div>

          <div className={productList.itemTotal}>
            <span className={productList.itemTotalPrice}>
              {
                new Intl.NumberFormat(
                  'en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }
                ).format(
                  product.get(PURCHASE_PRICE) * product.get(QUANTITY)
                )
              }
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductOrder

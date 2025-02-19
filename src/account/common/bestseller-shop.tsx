import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import LazyImage from '../../utils/lazyimage'
import { observer } from '../../utils/observer'

import Stars from '../../components/common/stars'

import SvgPlaceholder from '../../components/svg/placeholder'
import SvgBestseller from '../../components/svg/bestseller'

import * as buttons from '../../styles/buttons.module.css'
import * as products from '../../styles/products.module.css'
import * as utility from '../../styles/utility.module.css'

import { BreakPoint } from '../../types/common'

import {
  TProduct,
  TManufacturer
} from '../../types/account'

import {
  NAME,
  SLUG,
  IMAGES,
  BREAKPOINTS,
  RATING
} from '../../redux/selector-consts'

interface OwnProps {
  manufacturer: TManufacturer;
  product: TProduct;
}

function BestsellerShop ({ product, manufacturer }: OwnProps): JSX.Element {
  const breakpoints = React.useMemo(
    function setBreakpoints (): BreakPoint[] {
      const image = product.get(IMAGES).get(0)
      return image !== undefined ? image.get(BREAKPOINTS).toJS() : []
    }, [ product ]
  )

  return (
    <li className={products.bestsellerItem}>
      <div className={products.bestsellerItemContent}>
        <div className={products.productItemThumb}>
          <Link
            title={`Product ${product.get(NAME)} ${manufacturer.get(NAME)}`}
            className={
              classnames(
                utility.db,
                utility.tdn
              )
            }
            to={`/account/product/${product.get(SLUG)}`}
          >
            {
              product.get(IMAGES).size > 0
                ? (
                  <LazyImage
                    observer={observer}
                    className={products.bestsellerItemImage}
                    breakpoints={breakpoints}
                    title={`Image of the ${product.get(NAME)}`}
                    alt={`Image of the ${product.get(NAME)}`}
                  />
                )
                : (
                  <div
                    role='img'
                    aria-label='Product image placeholder'
                    className={products.bestsellerItemPlaceholder}
                  >
                    <SvgPlaceholder />
                  </div>
                )
            }

            <div
              role='img'
              aria-label='Shop'
              className={
                classnames(
                  products.iconBestseller,
                  products.bestsellerGold)
              }
            >
              <SvgBestseller />
            </div>
          </Link>
        </div>

        <div className={products.bestsellerItemDetails}>
          <Link
            className={utility.db}
            to={`/account/product/${product.get(SLUG)}`}
          >
            <h2 className={products.productTitle}>
              { product.get(NAME) }
            </h2>
          </Link>

          <Link
            className={
              classnames(
                products.productManufacturer,
                utility.db,
                utility.tdn
              )
            }
            to={`/account/manufacturer/${manufacturer.get(SLUG)}`}
          >
            { manufacturer.get(NAME) }
          </Link>

          <div className={products.productRating}>
            <Stars
              rating={product.get(RATING)}
            />
          </div>

          <div className={products.bestsellerButtonShop}>
            <Link
              to={`/account/product/${product.get(SLUG)}`}
              className={
                classnames(
                  buttons.button,
                  buttons.buttonPrimary,
                  buttons.buttonSmall
                )
              }
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </li>
  )
}

export default BestsellerShop

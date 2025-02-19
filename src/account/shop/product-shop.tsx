import * as React from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import classnames from 'classnames'

import LazyImage from '../../utils/lazyimage'
import { observer } from '../../utils/observer'

import { getManufacturersItems } from '../../redux/selectors/user-manufacturers'

import Version from './version-shop'
import Stars from '../../components/common/stars'

import SvgPlaceholder from '../../components/svg/placeholder'
import SvgBestseller from '../../components/svg/bestseller'

import * as grid from '../../styles/grid.module.css'
import * as products from '../../styles/products.module.css'
import * as utility from '../../styles/utility.module.css'

import { ReduxState, BreakPoint } from '../../types/common'

import {
  TProduct,
  TManufacturer
} from '../../types/account'

import {
  NAME,
  SLUG,
  IMAGES,
  BREAKPOINTS,
  IS_BESTSELLER,
  RATING,
  ID,
  VERSIONS,
  MANUFACTURER_ID
} from '../../redux/selector-consts'

interface StateProps {
  manufacturer: TManufacturer;
}

interface OwnProps {
  product: TProduct;
}

function ProductShop ({ product, manufacturer }: StateProps & OwnProps): JSX.Element {
  const breakpoints = React.useMemo(
    function setBreakpoints (): BreakPoint[] {
      const image = product.get(IMAGES).get(0)
      return image !== undefined ? image.get(BREAKPOINTS).toJS() : []
    }, [ product ]
  )

  return (
    <li
      className={
        classnames(
          products.productItem,
          grid.colSm4,
          grid.colMd2
        )
      }
    >
      <article className={products.productItemContent}>
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
                    className={products.productItemImage}
                    breakpoints={breakpoints}
                    title={`Image of the ${product.get(NAME)}`}
                    alt={`Image of the ${product.get(NAME)}`}
                  />
                )
                : (
                  <div
                    role='img'
                    aria-label='Shop image placeholder'
                    className={products.productItemPlaceholder}
                  >
                    <SvgPlaceholder />
                  </div>
                )
            }

            {
              product.get(IS_BESTSELLER) && (
                <div
                  className={
                    classnames(
                      products.iconBestseller,
                      products.bestsellerGold
                    )
                  }
                >
                  <SvgBestseller />
                </div>
              )
            }
          </Link>
        </div>

        <div className={products.productItemDetails}>
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

          <div className={products.productVersions}>
            {
              product.get(VERSIONS).map(function mapper (version): JSX.Element {
                return (
                  <Version
                    key={version.get(ID)}
                    version={version}
                    productId={product.get(ID)}
                  />
                )
              })
            }
          </div>
        </div>
      </article>
    </li>
  )
}

const mapStateToProps = (state: ReduxState, { product }: OwnProps): StateProps => ({
  manufacturer: getManufacturersItems(state)
    .get(product.get(MANUFACTURER_ID)) as TManufacturer
})

export default connect(
  mapStateToProps
)(ProductShop)

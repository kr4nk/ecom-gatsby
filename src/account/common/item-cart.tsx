import * as React from 'react'
import { Link } from 'gatsby'

import LazyImage from '../../utils/lazyimage'
import { observer } from '../../utils/observer'

import VersionCart from '../cart-common/version-cart'
import SvgPlaceholder from '../../components/svg/placeholder'

import * as productsList from '../../styles/products-list.module.css'

import { BreakPoint } from '../../types/common'
import { TManufacturer, TProduct } from '../../types/account'

import {
  NAME,
  ID,
  IMAGES,
  SLUG,
  BREAKPOINTS,
  VERSIONS
} from '../../redux/selector-consts'

interface OwnProps {
  manufacturer: TManufacturer;
  product: TProduct;
}

function ItemCart ({ product, manufacturer }: OwnProps): JSX.Element {
  const breakpoints = React.useMemo(
    function setBreakpoints (): BreakPoint[] {
      const image = product.get(IMAGES).get(0)
      return image !== undefined ? image.get(BREAKPOINTS).toJS() : []
    }, [ product ]
  )

  return (
    <article className={productsList.itemProductCart}>
      <div className={productsList.itemDetailsCart}>
        <Link
          title={`Product ${product.get(NAME)} ${manufacturer.get(NAME)}`}
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
            title={`Product ${product.get(NAME)} ${manufacturer.get(NAME)}`}
            to={`/account/product/${product.get(SLUG)}`}
          >
            <h4 className={productsList.itemTitle}>
              { product.get(NAME) }
            </h4>
          </Link>

          <div className={productsList.itemManufacturer}>
            { manufacturer.get(NAME) }
          </div>
        </div>
      </div>

      {
        product.get(VERSIONS).map(function mapper (version): JSX.Element {
          return (
            <VersionCart
              key={version.get(ID)}
              productId={product.get(ID)}
              version={version}
            />
          )
        })
      }
    </article>
  )
}

export default ItemCart

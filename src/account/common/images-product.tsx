import * as React from 'react'
import classnames from 'classnames'

import LazyImage from '../../utils/lazyimage'
import { observer } from '../../utils/observer'

import SvgPlaceholder from '../../components/svg/placeholder'
import SvgBestseller from '../../components/svg/bestseller'

import ButtonThumbProduct from './button-thumb-product'

import * as product from '../../styles/product.module.css'
import * as products from '../../styles/products.module.css'

import { BreakPoint, TImmutableImages } from '../../types/common'

import { BREAKPOINTS } from '../../redux/selector-consts'

interface OwnProps {
  images: TImmutableImages;
  isBestseller: boolean;
}

function ImagesProduct (props: OwnProps): JSX.Element {
  const [ current, setCurrent ] = React.useState(0)

  const breakpoints = React.useMemo(
    function setBreakpoints (): BreakPoint[] {
      const image = props.images.get(current)
      return image !== undefined ? image.get(BREAKPOINTS).toJS() : []
    }, [ current, props.images ]
  )

  return (
    <div className={product.product}>
      <div className={product.productImage}>
        {
          props.images.size > 0
            ? (
              <LazyImage
                observer={observer}
                className={
                  classnames(
                    product.image,
                    product.imageSelected
                  )
                }
                breakpoints={breakpoints}
                title='Selected image of the product'
                alt='Selected image of the product'
              />
            )
            : (
              <div
                role='img'
                aria-label='Product image placeholder'
                className={product.placeholder}
              >
                <SvgPlaceholder />
              </div>
            )
        }

        {
          props.isBestseller && (
            <div
              role='img'
              aria-label='Bestseller'
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
      </div>

      {
        props.images.size > 1
          ? (
            <div className={product.productThumbs}>
              {
                props.images.map(function mapper (image, index): JSX.Element {
                  return (
                    <ButtonThumbProduct
                      key={index}
                      index={index}
                      selected={index === current}
                      breakpoints={image.get(BREAKPOINTS)}
                      onClick={setCurrent}
                    />
                  )
                })
              }
            </div>
          )
          : (<></>)
      }
    </div>
  )
}

export default React.memo(ImagesProduct)

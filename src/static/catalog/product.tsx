import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import LazyImage from '../../utils/lazyimage'
import { observer } from '../../utils/observer'

import SvgPlaceholder from '../../components/svg/placeholder'
// import Price from '../common/price'

import { ContextCatalog } from '../../context/catalog'

import * as productsList from '../../styles/products-list.module.css'
import * as defaultCatalog from '../../styles/default-catalog.module.css'
import * as utility from '../../styles/utility.module.css'

import { TProduct } from '../../types/static'

interface OwnProps {
  product: TProduct;
}

function Product ({ product }: OwnProps): JSX.Element {
  const { manufacturerItems } = React.useContext(ContextCatalog)

  return (
    <article
      className={
        classnames(
          defaultCatalog.productItem,
          productsList.itemProductCatalog, {
            [productsList.unpublished]: !product.isPublished
          }
        )
      }
    >
      <div className={productsList.itemThumb}>
        {
          product.images.length > 0
            ? (
              <LazyImage
                observer={observer}
                breakpoints={product.images[0].breakpoints}
                title={`Image of ${product.name}`}
                alt={`Image of ${product.name}`}
              />
            )
            : (
              <SvgPlaceholder />
            )
        }
      </div>

      <div className={productsList.itemDetails}>
        <Link
          title={`Go To Product ${product.name}`}
          to={`/product/${product.slug}`}
        >
          <h4 className={productsList.itemTitle}>
            { product.name }
          </h4>
        </Link>

        <div className={productsList.itemManufacturer}>
          { manufacturerItems[product.manufacturerId].name }
        </div>

        <div className={productsList.itemVersions}>
          {
            product.versions.map(function mapper (version, index: number): JSX.Element {
              return (
                <div
                  key={index}
                  className={
                    classnames(
                      productsList.itemVersion,
                      utility.df,
                      utility.jcsb,
                      utility.aic
                    )
                  }
                >
                  <div className={productsList.itemWeight}>
                    { version.size }

                    &nbsp;

                    { version.unit }
                  </div>

                  {/*<div className={versionPrice}>
                    <Price
                      version={version}
                      position='product'
                    />
                  </div>*/}
                </div>
              )
            })
          }
        </div>
      </div>
    </article>
  )
}

export default Product

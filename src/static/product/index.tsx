import * as React from 'react'
import { Link } from 'gatsby'

import { ContextProduct } from '../../context/product'

import Breadcrumbs from './breadcrumbs'

import Images from './images'
import Versions from './versions'
import Info from './info'
import Certificates from './certificates'

import Stars from '../../components/common/stars'
import ButtonReturn from '../../components/common/button-return'

import * as layout from '../../styles/layout.module.css'
import * as product from '../../styles/product.module.css'

import { TDangerHTML } from '../../types/common'
import { TProduct } from '../../types/static'

interface OwnProps {
  product: TProduct;
}

function DefaultProduct (props: OwnProps): JSX.Element {
  const { manufacturerItems, certificateItems } = React.useContext(ContextProduct)

  const description = React.useMemo(
    function setDesc (): TDangerHTML {
      return { __html: props.product.descShort }
    }, [ props.product.descShort ]
  )

  return (
    <div className={layout.container}>
      <div className={layout.controls}>
        <ButtonReturn />
      </div>

      <div className={layout.content}>
        <Breadcrumbs
          product={props.product}
        />

        <div className={product.product}>
          <Images
            images={props.product.images}
            isBestseller={props.product.isBestseller}
          />

          <div className={product.productDetails}>
            <section className={layout.section}>
              <h1 className={product.productTitle}>
                { props.product.name }
              </h1>

              <div className={product.productManufacturer}>
                <Link
                  title={`Go To Manufacturer ${manufacturerItems[props.product.manufacturerId].name}`}
                  to={`/manufacturer/${manufacturerItems[props.product.manufacturerId].slug}`}
                >
                  { manufacturerItems[props.product.manufacturerId].name }
                </Link>
              </div>

              <div className={product.productRating}>
                <Stars
                  rating={props.product.rating}
                />
              </div>

              <div
                className={product.productDescription}
                dangerouslySetInnerHTML={description}
              />
            </section>

            <Versions
              versions={props.product.versions}
            />

            <Info
              product={props.product}
              manufacturer={manufacturerItems[props.product.manufacturerId]}
            />

            {
              props.product.certificates.length > 0
                ? (
                  <Certificates
                    list={props.product.certificates}
                    items={certificateItems}
                  />
                )
                : (<></>)
            }
          </div>
        </div>
      </div>

      <div className={layout.controls}>
        <ButtonReturn />
      </div>
    </div>
  )
}

export default DefaultProduct

import * as React from 'react'

import * as productModule from '../../styles/product.module.css'
import * as layout from '../../styles/layout.module.css'

import ImagesProduct from './images-product'
import VersionsProduct from './versions-product'
import InfoProduct from './info-product'
import OrderTotal from '../product/order-total-product'
import CertificatesProduct from '../product/certificates-product'

import Stars from '../../components/common/stars'

import { TDangerHTML } from '../../types/common'

import {
  TProduct,
  TManufacturer
} from '../../types/account'

import { IMAGES, IS_BESTSELLER, NAME, RATING, VERSIONS, CERTIFICATES } from '../../redux/selector-consts'

interface OwnProps {
  manufacturer: TManufacturer;
  description: TDangerHTML;
  product: TProduct;
}

const ContentProduct = ({ product, description, manufacturer }: OwnProps): JSX.Element => (
  <article className={productModule.product}>
    <ImagesProduct
      images={product.get(IMAGES)}
      isBestseller={product.get(IS_BESTSELLER)}
    />

    <div className={productModule.productDetails}>
      <section className={layout.section}>
        <h1 className={productModule.productTitle}>
          { product.get(NAME) }
        </h1>

        <div className={productModule.productManufacturer}>
          {
            manufacturer !== undefined &&
            manufacturer.get(NAME)
          }
        </div>

        <div className={productModule.productRating}>
          <Stars
            rating={product.get(RATING)}
          />
        </div>

        <div
          className={productModule.productDescription}
          dangerouslySetInnerHTML={description}
        />
      </section>

      <VersionsProduct
        versions={product.get(VERSIONS)}
      />

      <OrderTotal
        product={product}
      />

      <InfoProduct
        product={product}
        manufacturer={manufacturer}
      />

      {
        // eslint-disable-next-line @getify/proper-arrows/return
        product.get(CERTIFICATES).size > 0
          ? (
            <CertificatesProduct
              list={product.get(CERTIFICATES)}
            />
          )
          : (<></>)
      }
    </div>
  </article>
)

export default ContentProduct

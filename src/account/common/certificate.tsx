import * as React from 'react'
import classnames from 'classnames'

import CertIcon from '../../components/common/cert-icon'
import Spinner from '../../components/common/spinner'

import Product from '../shop/product-shop'
import Breadcrumbs from './breadcrumbs-certificates'

import * as managerCertificates from '../../styles/manager-certificates.module.css'
import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'
import * as productsModule from '../../styles/products.module.css'

import {
  TImmutableIds
} from '../../types/common'

import {
  TCertificate,
  TProduct,
  TProducts
} from '../../types/account'

import {
  NAME,
  ABBR,
  DESC_FULL,
  URL,
  ID,
  CERTIFICATES
} from '../../redux/selector-consts'

interface OwnProps {
  isFetching: boolean;
  isShopLoaded: boolean;
  certificate: TCertificate | undefined;
  productIds: TImmutableIds;
  products: TProducts;
}

const Certificate = ({
  certificate,
  isFetching,
  isShopLoaded,
  // eslint-disable-next-line @getify/proper-arrows/params
  productIds,
  products
}: OwnProps): JSX.Element => {
  return (
    isShopLoaded &&
    certificate !== undefined
  )
    ? (
      <div className={layout.container}>
        <div className={layout.content}>
          <Breadcrumbs
            certificate={certificate}
          />

          <h1 className={layout.pageTitle}>
            { certificate.get(NAME) } ({ certificate.get(ABBR) })
          </h1>

          <section className={layout.section}>
            <div className={grid.row}>
              <div
                className={
                  classnames(
                    managerCertificates.certificateImage,
                    grid.colMd1
                  )
                }
              >
                <CertIcon
                  abbr={certificate.get(ABBR)}
                />
              </div>

              <div className={grid.colMd3}>
                <p className={layout.paragraph}>
                  { certificate.get(DESC_FULL) }
                </p>

                <a
                  className={managerCertificates.link}
                  href={certificate.get(URL)}
                  title='link to certificate authority'
                  rel='nofollow noopener noreferrer'
                  target='_blank'
                >
                  { certificate.get(URL) }
                </a>
              </div>
            </div>
          </section>

          <section className={layout.section}>
            <h2 className={layout.sectionTitle}>
              Products
            </h2>

            <ul
              className={
                classnames(
                  productsModule.productsList,
                  grid.row
                )
              }
            >
              {
                productIds
                  .filter(function filter (id): boolean {
                    const item = products.get(id)

                    return (
                      item !== undefined &&
                      item.get(CERTIFICATES).includes(certificate.get(ID))
                    )
                  })
                  .map(function mapper (id): JSX.Element {
                    return (
                      <Product
                        key={id}
                        product={products.get(id) as TProduct}
                      />
                    )
                  })
              }
            </ul>
          </section>

          <Breadcrumbs
            certificate={certificate}
          />
        </div>
      </div>
    )
    : isFetching
      ? (
        <Spinner />
      )
      : (<></>)
}

export default Certificate

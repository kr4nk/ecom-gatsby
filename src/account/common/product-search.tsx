import * as React from 'react'

import searchAndMarkText from '../../utils/search'

import * as productCss from '../../styles/product.module.css'
import * as layout from '../../styles/layout.module.css'

import ImagesProduct from './images-product'
import VersionsProduct from './versions-product'
import InfoSearch from './info-search'

import OrderTotal from '../product/order-total-product'
import CertificatesProduct from '../product/certificates-product'

import Stars from '../../components/common/stars'

import {
  TProduct,
  TProductSearchFieldsMap,
  TProductDangerHTML,
  TManufacturer,
  TManufacturerSearchFieldsMap,
  TManufacturerDangerHTML
} from '../../types/account'

import {
  NAME,
  DESC_SHORT,
  DESC_FULL,
  DETAILS,
  IMAGES,
  IS_BESTSELLER,
  RATING,
  VERSIONS,
  FILES,
  CERTIFICATES
} from '../../redux/selector-consts'

interface OwnProps {
  manufacturer: TManufacturer;
  product: TProduct;
  search: string;
}

const productFields = [NAME, DESC_SHORT, DESC_FULL, DETAILS]

// TODO: generalize to utils
function searchInProduct (origin: TProduct, search: RegExp): TProductDangerHTML {
  const fields = origin as TProductSearchFieldsMap

  const product: TProductDangerHTML = {
    name: { __html: '' },
    descShort: { __html: '' },
    descFull: { __html: '' },
    details: { __html: '' },
  }

  for (let field of productFields) {
    product[field] = searchAndMarkText(fields.get(field), search)
  }

  return product
}

const manufacturerFields = [NAME, DESC_SHORT]

function searchInManufacturer (origin: TManufacturer, search: RegExp): TManufacturerDangerHTML {
  const fields = origin as TManufacturerSearchFieldsMap

  const manufacturer: TManufacturerDangerHTML = {
    name: { __html: '' },
    descShort: { __html: '' }
  }

  for (let field of manufacturerFields) {
    manufacturer[field] = searchAndMarkText(fields.get(field), search)
  }

  return manufacturer
}

function ProductSearch (props: OwnProps): JSX.Element {
  const product = React.useMemo<TProductDangerHTML>(
    function setProduct (): TProductDangerHTML {
      return searchInProduct(props.product, new RegExp(props.search, 'gi'))
    }, [ props.search, props.product ]
  )

  const manufacturer = React.useMemo<TManufacturerDangerHTML>(
    function setManufacturer (): TManufacturerDangerHTML {
      return searchInManufacturer(props.manufacturer, new RegExp(props.search, 'gi'))
    }, [ props.manufacturer, props.search ]
  )

  return (
    <article className={productCss.product}>
      <ImagesProduct
        images={props.product.get(IMAGES)}
        isBestseller={props.product.get(IS_BESTSELLER)}
      />

      <div className={productCss.productDetails}>
        <section className={layout.section}>
          <h1
            className={productCss.productTitle}
            dangerouslySetInnerHTML={product.name}
          />

          <div
            className={productCss.productManufacturer}
            dangerouslySetInnerHTML={manufacturer.name}
          />

          <div className={productCss.productRating}>
            <Stars
              rating={props.product.get(RATING)}
            />
          </div>

          <div
            className={productCss.productDescription}
            dangerouslySetInnerHTML={product.descShort}
          />
        </section>

        <VersionsProduct
          versions={props.product.get(VERSIONS)}
        />

        <OrderTotal
          product={props.product}
        />

        <InfoSearch
          files={props.product.get(FILES)}
          product={product}
          manufacturer={manufacturer}
        />

        {
          props.product.get(CERTIFICATES).size > 0
            ? (
              <CertificatesProduct
                list={props.product.get(CERTIFICATES)}
              />
            )
            : <></>
        }
      </div>
    </article>
  )
}

export default ProductSearch

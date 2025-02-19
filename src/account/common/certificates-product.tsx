import * as React from 'react'

import CertificateProduct from './certificate-product'

import * as layout from '../../styles/layout.module.css'
import * as product from '../../styles/product.module.css'

import { TImmutableIds } from '../../types/common'

import {
  TCertificates,
  TCertificate
} from '../../types/account'

import { ID } from '../../redux/selector-consts'

interface OwnProps {
  list: TImmutableIds;
  items: TCertificates;
}

const CertificatesProduct = ({ list, items }: OwnProps): JSX.Element => (
  <section className={layout.section}>
    <h2 className={layout.sectionTitle}>
      Certificates
    </h2>

    <div className={product.productCertificates}>
      {
        list
          .map(function mapper (id): TCertificate {
            return items.get(id) as TCertificate
          })
          .map(function mapper (item): JSX.Element {
            return (
              <CertificateProduct
                key={item.get(ID)}
                item={item}
              />
            )
          })
      }
    </div>
  </section>
)

export default CertificatesProduct

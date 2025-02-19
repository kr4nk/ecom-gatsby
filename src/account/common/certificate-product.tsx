import * as React from 'react'
import { Link } from 'gatsby'

import CertIcon from '../../components/common/cert-icon'

import * as product from '../../styles/product.module.css'
import { TCertificate } from '../../types/account'

import {
  ABBR,
  SLUG
} from '../../redux/selector-consts'

interface OwnProps {
  item: TCertificate;
}

const CetificateProduct = ({ item }: OwnProps): JSX.Element => (
  <div className={product.productCertificate}>
    <Link
      title={`Certificate ${item.get(ABBR)}`}
      className={product.productCertificateLink}
      to={`/account/certificate/${item.get(SLUG)}`}
    >
      <div className={product.certificateImage}>
        <CertIcon
          abbr={item.get(ABBR)}
        />
      </div>

      { item.get(ABBR) }
    </Link>
  </div>
)

export default CetificateProduct

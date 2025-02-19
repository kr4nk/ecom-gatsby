import * as React from 'react'

import * as product from '../../styles/product.module.css'

import { TManufacturerDangerHTML } from '../../types/account'

interface OwnProps {
  brand: TManufacturerDangerHTML;
  id: string;
}

const ProductBrand = ({ id, brand }: OwnProps): JSX.Element => (
  <div
    id={`${id}-tab`}
    role='tabpanel'
    aria-labelledby={id}
    tabIndex={0}
  >
    <p
      className={product.productTabContentManufacturer}
      dangerouslySetInnerHTML={brand.name}
    />

    <p
      dangerouslySetInnerHTML={brand.descShort}
    />
  </div>
)

export default ProductBrand

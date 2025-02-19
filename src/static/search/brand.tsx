import * as React from 'react'

import * as product from '../../styles/product.module.css'

import { TManufacturerDangerHTML } from '../../types/static'

interface OwnProps {
  id: string;
  brand: TManufacturerDangerHTML;
}

const Brand = ({ id, brand }: OwnProps): JSX.Element => (
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
      dangerouslySetInnerHTML={
        brand.descShort
      }
    />
  </div>
)

export default Brand

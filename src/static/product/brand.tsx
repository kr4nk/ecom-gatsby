import * as React from 'react'

import * as product from '../../styles/product.module.css'

import { TManufacturer } from '../../types/static'

interface OwnProps {
  id: string;
  brand: TManufacturer;
}

const Brand = ({ id, brand }: OwnProps): JSX.Element => (
  <div
    id={`${id}-tab`}
    role='tabpanel'
    aria-labelledby={id}
    tabIndex={0}
  >
    <p className={product.productTabContentManufacturer}>
      { brand.name }
    </p>

    <p>
      { brand.descShort }
    </p>
  </div>
)

export default Brand

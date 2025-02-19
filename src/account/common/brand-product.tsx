import * as React from 'react'

import * as product from '../../styles/product.module.css'
import { TManufacturer } from '../../types/account'

import {
  NAME,
  DESC_SHORT
} from '../../redux/selector-consts'

interface StateProps {
  brand: TManufacturer;
  id: string;
}

const BrandProduct = ({ id, brand }: StateProps): JSX.Element => (
  <div
    id={`${id}-tab`}
    role='tabpanel'
    aria-labelledby={id}
    tabIndex={0}
  >
    <p className={product.productTabContentManufacturer}>
      { brand.get(NAME) }
    </p>

    <p>
      { brand.get(DESC_SHORT) }
    </p>
  </div>
)

export default BrandProduct

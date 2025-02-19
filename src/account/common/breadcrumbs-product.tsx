import * as React from 'react'
import { Link } from 'gatsby'

import * as breadcrumbs from '../../styles/breadcrumbs.module.css'
import { TProduct } from '../../types/account'

import { NAME } from '../../redux/selector-consts';

interface StateProps {
  product: TProduct;
}

const BreadcrumbsProduct = ({ product }: StateProps): JSX.Element => (
  <ul className={breadcrumbs.breadcrumbs}>
    <li className={breadcrumbs.breadcrumb}>
      <Link
        title='Dashboard'
        to='/account'
      >
        Shop
      </Link>
    </li>

    <li className={breadcrumbs.breadcrumb}>
      { product.get(NAME) }
    </li>
  </ul>
)

export default BreadcrumbsProduct

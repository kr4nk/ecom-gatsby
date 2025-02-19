import * as React from 'react'
import { Link } from 'gatsby'

import * as breadcrumbs from '../../styles/breadcrumbs.module.css'

import { TProduct } from '../../types/static'

interface OwnProps {
  product: TProduct;
}

const Breadcrumbs = ({ product }: OwnProps): JSX.Element => (
  <ul className={breadcrumbs.breadcrumbs}>
    <li className={breadcrumbs.breadcrumb}>
      <Link
        title='Go To Home'
        to='/'
      >
        Home
      </Link>
    </li>

    <li className={breadcrumbs.breadcrumb}>
      { product.name }
    </li>
  </ul>
)

export default Breadcrumbs

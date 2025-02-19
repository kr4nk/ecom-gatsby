import * as React from 'react'
import { Link } from 'gatsby'

import * as breadcrumbs from '../../styles/breadcrumbs.module.css'
import { TManufacturer } from '../../types/account'

import { NAME } from '../../redux/selector-consts'

interface StateProps {
  manufacturer: TManufacturer;
}

const BreadcrumbsManufacturers = ({ manufacturer }: StateProps): JSX.Element => (
  <ul className={breadcrumbs.breadcrumbs}>
    <li className={breadcrumbs.breadcrumb}>
      <Link
        title='Dashboard'
        to='/account/manufacturers'
      >
        Manufacturers
      </Link>
    </li>

    <li className={breadcrumbs.breadcrumb}>
      { manufacturer.get(NAME) }
    </li>
  </ul>
)

export default BreadcrumbsManufacturers

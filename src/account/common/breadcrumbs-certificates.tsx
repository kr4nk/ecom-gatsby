import * as React from 'react'
import { Link } from 'gatsby'

import * as breadcrumbs from '../../styles/breadcrumbs.module.css'
import { TCertificate } from '../../types/account'

import { NAME } from '../../redux/selector-consts'

interface StateProps {
  certificate: TCertificate;
}

const BreadcrumbsCertificates = ({ certificate }: StateProps): JSX.Element => (
  <ul className={breadcrumbs.breadcrumbs}>
    <li className={breadcrumbs.breadcrumb}>
      <Link
        title='Certificates'
        to='/account/certificates'
      >
        Certificates
      </Link>
    </li>

    <li className={breadcrumbs.breadcrumb}>
      { certificate.get(NAME) }
    </li>
  </ul>
)

export default BreadcrumbsCertificates

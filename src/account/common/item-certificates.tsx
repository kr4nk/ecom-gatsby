import * as React from 'react'
import classnames from 'classnames'
import { Link } from 'gatsby'
import CertIcon from '../../components/common/cert-icon'

import * as managerCertificates from '../../styles/manager-certificates.module.css'
import * as layout from '../../styles/layout.module.css'
import * as grid from '../../styles/grid.module.css'

import { TCertificate } from '../../types/account'

import {
  SLUG,
  ABBR,
  NAME,
  DESC_SHORT,
  URL
} from '../../redux/selector-consts'

interface OwnProps {
  certificate: TCertificate;
}

const ItemCertificates = ({ certificate }: OwnProps): JSX.Element => (
  <li>
    <section className={layout.section}>
      <div className={grid.row}>
        <div
          className={
            classnames(
              managerCertificates.certificateImage,
              grid.colMd1
            )
          }
        >
          <CertIcon
            abbr={certificate.get(ABBR)}
          />
        </div>

        <div className={grid.colMd3}>
          <Link
            to={`/account/certificate/${certificate.get(SLUG)}`}
            className={layout.sectionTitle}
          >
            { certificate.get(NAME) } ({ certificate.get(ABBR) })
          </Link>

          <p className={layout.paragraph}>
            { certificate.get(DESC_SHORT) }
          </p>

          <a
            className={managerCertificates.link}
            href={certificate.get(URL)}
            title='Link To Certificate Authority'
            rel='nofollow noopener noreferrer'
            target='_blank'
          >
            { certificate.get(URL) }
          </a>
        </div>
      </div>
    </section>
  </li>
)

export default ItemCertificates

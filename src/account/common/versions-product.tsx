import * as React from 'react'

import VersionProduct from '../product/version-product'

import * as layout from '../../styles/layout.module.css'
import * as product from '../../styles/product.module.css'

import { TProductVersions } from '../../types/account'

import { ID } from '../../redux/selector-consts'

interface StateProps {
  versions: TProductVersions;
}

const VersionsProduct = ({ versions }: StateProps): JSX.Element => (
  <section className={layout.section}>
    <h2 className={layout.sectionTitle}>
      Product options
    </h2>

    <div className={product.productVersions}>
      {
        versions.map(function mapper (version): JSX.Element {
          return (
            <VersionProduct
              key={version.get(ID)}
              version={version}
            />
          )
        })
      }
    </div>
  </section>
)

export default VersionsProduct

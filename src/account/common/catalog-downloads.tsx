import * as React from 'react'

import ItemDownloads from '../downloads/item-downloads'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import { TImmutableDocument } from '../../types/common'

interface OwnProps {
  catalog: TImmutableDocument;
}

const CatalogDownloads = ({ catalog }: OwnProps): JSX.Element => (
  <ul className={tableResponsive.tableBody}>
    <ItemDownloads
      file={catalog}
    />
  </ul>
)

export default CatalogDownloads

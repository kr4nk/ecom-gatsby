import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as utility from '../../styles/utility.module.css'

import { TManufacturer } from '../../types/account'

import { NAME, SLUG } from '../../redux/selector-consts'

interface OwnProps {
  manufacturer: TManufacturer;
  count: number;
}

const ItemManufacturers = ({ manufacturer, count }: OwnProps): JSX.Element => (
  <li>
    <Link
      title={manufacturer.get(NAME)}
      className={tableResponsive.tableLink}
      to={`/account/manufacturer/${manufacturer.get(SLUG)}`}
    >
      <div className={tableResponsive.tableRow}>
        <div
          className={tableResponsive.tableCell}
          data-title='Manufacturer'
        >
          { manufacturer.get(NAME) }
        </div>

        <div
          className={
            classnames(
              tableResponsive.tableCell,
              tableResponsive.tableCellXSmall,
              utility.tar
            )
          }
          data-title='Products'
        >
          { count }
        </div>
      </div>
    </Link>
  </li>
)

export default ItemManufacturers

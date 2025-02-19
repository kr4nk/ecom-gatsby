import * as React from 'react'
import classnames from 'classnames'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as utility from '../../styles/utility.module.css'

const HeaderManufacturers = (): JSX.Element => (
  <div className={tableResponsive.tableHeader}>
    <div className={tableResponsive.headerRow}>
      <div className={tableResponsive.tableCell}>
        Manufacturer
      </div>

      <div
        className={
          classnames(
            tableResponsive.tableCell,
            tableResponsive.tableCellXSmall,
            utility.tar
          )
        }
      >
        Products
      </div>
    </div>
  </div>
)

export default HeaderManufacturers

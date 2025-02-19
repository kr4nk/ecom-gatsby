import * as React from 'react'
import classnames from 'classnames'

import * as tableResponsive from '../../styles/table-responsive.module.css'

const HeaderOrders = (): JSX.Element => (
  <div className={tableResponsive.tableHeader}>
    <div className={tableResponsive.headerRowResponsive}>
      <div
        className={
          classnames(
            tableResponsive.tableCell,
            tableResponsive.tableCellSmall
          )
        }
      >
        Order
      </div>

      <div className={tableResponsive.tableCell}>
        Status
      </div>

      <div className={tableResponsive.tableCell}>
        Created on
      </div>

      <div className={tableResponsive.tableCell}>
        Processed on
      </div>

      <div className={tableResponsive.tableCell}>
        Shipped on
      </div>

      <div className={tableResponsive.tableCell}>
        Complete on
      </div>
    </div>
  </div>
)

export default HeaderOrders

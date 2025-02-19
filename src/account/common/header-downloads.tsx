import * as React from 'react'
import classnames from 'classnames'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as utility from '../../styles/utility.module.css'

const HeaderDownloads = (): JSX.Element => (
  <div className={tableResponsive.tableHeader}>
    <div className={tableResponsive.headerRowResponsive}>
      <div
        className={
          classnames(
            tableResponsive.tableCell,
            tableResponsive.tableCellIcon
          )
        }
      >
        &nbsp;
      </div>

      <div className={tableResponsive.tableCell}>
        Name
      </div>

      <div
        className={
          classnames(
            tableResponsive.tableCell,
            tableResponsive.tableCellSmall,
            utility.tar
          )
        }
      >
        Size
      </div>

      <div
        className={
          classnames(
            tableResponsive.tableCell,
            tableResponsive.tableCellSmall,
            utility.tar
          )
        }
      >
        Date
      </div>

      <div
        className={
          classnames(
            tableResponsive.tableCell,
            tableResponsive.tableCellSmall,
            utility.tar
          )
        }
      >
        Action
      </div>
    </div>
  </div>
)
export default HeaderDownloads

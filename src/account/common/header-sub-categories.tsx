import * as React from 'react'
import classnames from 'classnames'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as utility from '../../styles/utility.module.css'

const HeaderSubCategories = (): JSX.Element => (
  <div className={tableResponsive.tableHeader}>
    <div className={tableResponsive.headerRowResponsive}>
      <div className={tableResponsive.tableCell}>
        Sub-category
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

export default HeaderSubCategories

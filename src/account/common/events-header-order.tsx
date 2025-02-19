import * as React from 'react'
import classnames from 'classnames'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as utility from '../../styles/utility.module.css'

const EventsHeader = (): JSX.Element => (
  <div
    className={
      classnames(
        managerOrder.tableHeader,
        utility.full
      )
    }
  >
    <div className={tableResponsive.headerRowResponsive}>
      <div className={tableResponsive.tableCell}>
        Action
      </div>

      <div className={tableResponsive.tableCell}>
        Actor
      </div>

      <div
        className={
          classnames(
            tableResponsive.tableCell,
            utility.tar
          )
        }
      >
        Date
      </div>
    </div>
  </div>
)

export default EventsHeader

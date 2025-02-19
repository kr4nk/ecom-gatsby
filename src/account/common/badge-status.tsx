import * as React from 'react'
import classnames from 'classnames'

import StatusIcon from './status-icon'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'

const statusClasses: {
  [key: string]: string;
} = {
  pending: managerOrder.statusPending,
  complete: managerOrder.statusComplete,
  canceled: managerOrder.statusCanceled
}

interface OwnProps {
  status: string;
}

const BadgeStatus = ({ status }: OwnProps): JSX.Element => (
  <div
    className={
      classnames(
        managerOrder.badgeStatus,
        utility.dif,
        statusClasses[status]
      )
    }
  >
    <div
      className={
        classnames(
          managerOrder.iconSmall,
          managerOrder.iconStatusSmall
        )
      }
    >
      <StatusIcon
        status={status}
      />
    </div>
  </div>
)

export default BadgeStatus

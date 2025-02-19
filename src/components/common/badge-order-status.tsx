import * as React from 'react'
import classnames from 'classnames'

import {
  ORDER_PENDING,
  ORDER_PROCESSING,
  ORDER_SHIPPED,
  ORDER_COMPLETE,
  ORDER_CANCELED,
  ORDER_REFUND,
  ORDER_REFUNDED,
  getStatusName
} from '../../const/orders'

import StatusIcon from '../../manager/order-common/status-icon'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  status: number;
}

const statusClasses: {
  [key: string]: string;
} = {
  [ORDER_PENDING]: managerOrder.statusPending,
  [ORDER_PROCESSING]: managerOrder.statusProcessing,
  [ORDER_SHIPPED]: managerOrder.statusShipped,
  [ORDER_COMPLETE]: managerOrder.statusComplete,
  [ORDER_CANCELED]: managerOrder.statusCanceled,
  [ORDER_REFUND]: managerOrder.statusRefund,
  [ORDER_REFUNDED]: managerOrder.statusRefunded
}

function BadgeOrderStatus ({ status }: OwnProps): JSX.Element {
  return (
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

      <span>
        { getStatusName(status) }
      </span>
    </div>
  )
}

export default React.memo(BadgeOrderStatus)

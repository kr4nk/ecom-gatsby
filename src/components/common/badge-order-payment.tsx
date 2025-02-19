import * as React from 'react'
import classnames from 'classnames'

import {
  ORDER_PENDING,
  ORDER_COMPLETE
} from '../../const/orders'

import StatusIcon from '../../manager/order-common/status-icon'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  isPaid: boolean;
}

function BadgePayment ({ isPaid }: OwnProps): JSX.Element {
  return (
    <div
      className={
        classnames(
          managerOrder.badgePayment,
          utility.dif, {
            [managerOrder.paid]: isPaid
          }
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
          status={
            isPaid
              ? ORDER_COMPLETE
              : ORDER_PENDING
          }
        />
      </div>

      <span>
        {
          isPaid
            ? 'Paid'
            : 'Not Paid'
        }
      </span>
    </div>
  )
}

export default React.memo(BadgePayment)

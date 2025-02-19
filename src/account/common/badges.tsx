import * as React from 'react'
import classnames from 'classnames'

import { ORDER_PENDING } from '../../const/orders'

import BadgeStatus from '../../components/common/badge-order-status'
import BadgePayment from '../../components/common/badge-order-payment'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'

import { TOrder } from '../../types/account'

import {
  IS_PAID,
  STATUS
} from '../../redux/selector-consts'

interface StateProps {
  order: TOrder;
}

const Badges = ({ order }: StateProps): JSX.Element => (
  <div
    className={
      classnames(
        managerOrder.bages,
        utility.df,
        utility.aic,
        utility.fww
      )
    }
  >
    <BadgeStatus
      status={order.get(STATUS)}
    />

    {
      // eslint-disable-next-line @getify/proper-arrows/return
      order.get(STATUS) !== ORDER_PENDING
        ? (
          <BadgePayment
            isPaid={order.get(IS_PAID)}
          />
        )
        : <></>
    }
  </div>
)

export default Badges

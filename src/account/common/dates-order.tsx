import * as React from 'react'
import * as dayjs from 'dayjs'

import * as managerOrder from '../../styles/manager-order.module.css'

import { TOrder } from '../../types/account'

import {
  PENDING_AT,
  PROCESSING_AT,
  SHIPPED_AT,
  COMPLETE_AT,
  CANCELED_AT,
  REFUND_AT,
  REFUNDED_AT
} from '../../redux/selector-consts'

interface OwnProps {
  order: TOrder;
}

const DatesOrder = ({ order }: OwnProps): JSX.Element => (
  <div className={managerOrder.orderDates}>
    {
      order.get(PENDING_AT) && (
        <div className={managerOrder.orderDate}>
          Created on

          <time
            className={managerOrder.date}
            dateTime={
              dayjs(order.get(PENDING_AT))
                .toISOString()
            }
          >
            {
              dayjs(order.get(PENDING_AT))
                .format('LL')
            }
          </time>
        </div>
      )
    }

    {
      order.get(PROCESSING_AT) && (
        <div className={managerOrder.orderDate}>
          Processing since

          <time
            className={managerOrder.date}
            dateTime={
              dayjs(order.get(PROCESSING_AT))
                .toISOString()
            }
          >
            {
              dayjs(order.get(PROCESSING_AT))
                .format('LL')
            }
          </time>
        </div>
      )
    }

    {
      order.get(SHIPPED_AT) && (
        <div className={managerOrder.orderDate}>
          Shipped on

          <time
            className={managerOrder.date}
            dateTime={
              dayjs(order.get(SHIPPED_AT))
                .toISOString()
            }
          >
            {
              dayjs(order.get(SHIPPED_AT))
                .format('LL')
            }
          </time>
        </div>
      )
    }

    {
      order.get(COMPLETE_AT) && (
        <div className={managerOrder.orderDate}>
          Completed on

          <time
            className={managerOrder.date}
            dateTime={
              dayjs(order.get(COMPLETE_AT))
                .toISOString()
            }
          >
            {
              dayjs(order.get(COMPLETE_AT))
                .format('LL')
            }
          </time>
        </div>
      )
    }

    {
      order.get(CANCELED_AT) && (
        <div className={managerOrder.orderDate}>
          Canceled on

          <time
            className={managerOrder.date}
            dateTime={
              dayjs(order.get(CANCELED_AT))
                .toISOString()
            }
          >
            {
              dayjs(order.get(CANCELED_AT))
                .format('LL')
            }
          </time>
        </div>
      )
    }

    {
      order.get(REFUND_AT) && (
        <div className={managerOrder.orderDate}>
          Refund on

          <time
            className={managerOrder.date}
            dateTime={
              dayjs(order.get(REFUND_AT))
                .toISOString()
            }
          >
            {
              dayjs(order.get(REFUND_AT))
                .format('LL')
            }
          </time>
        </div>
      )
    }

    {
      order.get(REFUNDED_AT) && (
        <div className={managerOrder.orderDate}>
          Refunded on

          <time
            className={managerOrder.date}
            dateTime={
              dayjs(order.get(REFUNDED_AT))
                .toISOString()
            }
          >
            {
              dayjs(order.get(REFUNDED_AT))
                .format('LL')
            }
          </time>
        </div>
      )
    }
  </div>
)

export default DatesOrder

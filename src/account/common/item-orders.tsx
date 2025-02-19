import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import * as dayjs from 'dayjs'

import {
  ORDER_PENDING,
  ORDER_PROCESSING,
  ORDER_SHIPPED,
  ORDER_COMPLETE,
  ORDER_CANCELED,
  ORDER_REFUND,
  ORDER_REFUNDED
} from '../../const/orders'

import BadgeStatus from '../../components/common/badge-order-status'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as userOrders from '../../styles/user-orders.module.css'

import { TOrder } from '../../types/account'

import {
  ID,
  STATUS,
  PENDING_AT,
  PROCESSING_AT,
  SHIPPED_AT,
  COMPLETE_AT
} from '../../redux/selector-consts'

interface OwnProps {
  order: TOrder;
}

const statusClasses: {
  [key: string]: string;
} = {
  [ORDER_PENDING]: userOrders.pending,
  [ORDER_PROCESSING]: userOrders.processing,
  [ORDER_SHIPPED]: userOrders.shipped,
  [ORDER_COMPLETE]: userOrders.complete,
  [ORDER_CANCELED]: userOrders.canceled,
  [ORDER_REFUND]: userOrders.refund,
  [ORDER_REFUNDED]: userOrders.refunded
}

const ItemOrders = ({ order }: OwnProps): JSX.Element => (
  <Link
    title={`Order ID: ${order.get(ID)}`}
    to={`/account/order/${order.get(ID)}`}
    className={tableResponsive.tableLink}
  >
    <div className={tableResponsive.tableRowResponsive}>
      <div
        className={
          classnames(
            tableResponsive.tableCell,
            tableResponsive.tableCellSmall
          )
        }
        data-title='Order'
      >
        Order ID: { order.get(ID) }
      </div>

      <div
        className={
          classnames(
            tableResponsive.tableCell,
            userOrders.orderStatus,
            statusClasses[order.get(STATUS)]
          )
        }
        data-title='Status'
      >
        <BadgeStatus
          status={order.get(STATUS)}
        />
      </div>

      <time
        data-title='Created on'
        className={tableResponsive.tableCell}
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

      <time
        data-title='Processed on'
        className={tableResponsive.tableCell}
        dateTime={
          order.get(PROCESSING_AT)
            ? dayjs(order.get(PROCESSING_AT))
              .toISOString()
            : undefined
        }
      >
        {
          order.get(PROCESSING_AT) ? (
            dayjs(order.get(PROCESSING_AT))
              .format('LL')
          ) : (
            <span>&nbsp;</span>
          )
        }
      </time>

      <time
        data-title='Shipped on'
        className={tableResponsive.tableCell}
        dateTime={
          order.get(SHIPPED_AT)
            ? dayjs(order.get(SHIPPED_AT))
              .toISOString()
            : undefined
        }
      >
        {
          order.get(SHIPPED_AT) ? (
            dayjs(order.get(SHIPPED_AT))
              .format('LL')
          ) : (
            <span>&nbsp;</span>
          )
        }
      </time>

      <time
        data-title='Complete on'
        className={tableResponsive.tableCell}
        dateTime={
          order.get(COMPLETE_AT)
            ? dayjs(order.get(COMPLETE_AT))
              .toISOString()
            : undefined
        }
      >
        {
          // eslint-disable-next-line @getify/proper-arrows/return
          order.get(COMPLETE_AT)
            ? (
              dayjs(order.get(COMPLETE_AT))
                .format('LL')
            )
            : (
              <span>&nbsp;</span>
            )
        }
      </time>
    </div>
  </Link>
)

export default ItemOrders

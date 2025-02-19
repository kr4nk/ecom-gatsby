import * as React from 'react'
import classnames from 'classnames'
import * as dayjs from 'dayjs'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as utility from '../../styles/utility.module.css'

import { TOrderEvent } from '../../types/account'

import {
  ACTION,
  USER_NAME,
  CREATED_AT,
  MESSAGE
} from '../../redux/selector-consts'

interface OwnProps {
  event: TOrderEvent;
}

const EventOrder = ({ event }: OwnProps): JSX.Element => (
  <li className={tableResponsive.tableRowResponsive}>
    <div
      data-title='Action'
      className={tableResponsive.tableCell}
    >
      { event.get(ACTION) }
    </div>

    <div
      data-title='Actor'
      className={tableResponsive.tableCell}
    >
      {
        // eslint-disable-next-line @getify/proper-arrows/return
        event.get(USER_NAME)
          ? (
            <span>
              { event.get(USER_NAME) }
            </span>
          )
          : (
            <span>&nbsp;</span>
          )
      }
    </div>

    <time
      data-title='Date'
      className={
        classnames(
          tableResponsive.tableCell,
          utility.tar
        )
      }
      dateTime={
        dayjs(event.get(CREATED_AT))
          .toISOString()
      }
    >
      {
        dayjs(event.get(CREATED_AT))
          .format('LL')
      }
    </time>

    {
      event.get(MESSAGE) && (
        <p
          data-title='Message'
          className={managerOrder.comment}
        >
          { event.get(MESSAGE) }
        </p>
      )
    }
  </li>
)

export default EventOrder

import * as React from 'react'
import classnames from 'classnames'

import EventOrder from './event-order'

import * as tableResponsive from '../../styles/table-responsive.module.css'
import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'

import { TOrderEvents } from '../../types/account'

import { EVENT_ID } from '../../redux/selector-consts'

interface OwnProps {
  events: TOrderEvents;
}

const EventsOrder = ({ events }: OwnProps): JSX.Element => (
  <ul
    className={
      classnames(
        tableResponsive.tableBody,
        managerOrder.eventsTableBody,
        utility.full
      )
    }
  >
    {
      events.map(function mapper (event): JSX.Element {
        return (
          <EventOrder
            key={event.get(EVENT_ID)}
            event={event}
          />
        )
      })
    }
  </ul>
)

export default EventsOrder

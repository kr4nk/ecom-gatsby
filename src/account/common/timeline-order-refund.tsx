import * as React from 'react'
import classnames from 'classnames'

import EventsHeaderOrder from './events-header-order'
import Events from '../order-refund/events-order-refund'
import TextareaMessage from '../order-refund/textarea-message'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as grid from '../../styles/grid.module.css'

interface StateProps {
  index: number;
}

const TimelineOrderRefund = ({ index }: StateProps): JSX.Element => (
  <>
    <div className={managerOrder.events}>
      <EventsHeaderOrder />

      <Events
        index={index}
      />
    </div>

    <div
      className={
        classnames(
          managerOrder.comments,
          grid.row
        )
      }
    >
      <TextareaMessage
        index={index}
      />
    </div>
  </>
)

export default TimelineOrderRefund

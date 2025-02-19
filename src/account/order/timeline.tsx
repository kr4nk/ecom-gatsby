import * as React from 'react'

import * as managerOrder from '../../styles/manager-order.module.css'

import EventsHeaderOrder from '../common/events-header-order'
import EventsOrder from './events-order'
import CommentOrder from './comment-order'

const Timeline = (): JSX.Element => (
  <>
    <div className={managerOrder.events}>
      <EventsHeaderOrder />

      <EventsOrder />
    </div>

    <div className={managerOrder.comments}>
      <CommentOrder />
    </div>
  </>
)

export default Timeline

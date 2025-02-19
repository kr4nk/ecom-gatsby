import * as React from 'react'

import * as layout from '../../styles/layout.module.css'

import ControlsOrder from './controls-order'
import ContentOrder from './content-order'

const Order = (): JSX.Element => (
  <div className={layout.container}>
    <ControlsOrder />

    <ContentOrder />

    <ControlsOrder />
  </div>
)

export default Order

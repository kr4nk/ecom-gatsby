import * as React from 'react'

import ActionsDanger from './src/actions-danger'
import ActionsSafe from './src/actions-safe'

import * as layout from '../../styles/layout.module.css'

const Tools = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle}>
        Tools
      </h1>

      <ActionsSafe />

      <ActionsDanger />
    </div>
  </div>
)

export default Tools

import * as React from 'react'

import * as layout from '../../styles/layout.module.css'

const Dashboard = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle} >
        Dashboard
      </h1>

      <section className={layout.section}>
        Dashboard content
      </section>
    </div>
  </div>
)

export default Dashboard

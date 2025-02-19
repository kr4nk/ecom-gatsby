import * as React from 'react'

import ContentRegistration from './content-registration'

import * as layout from '../../styles/layout.module.css'

const Registration = (): JSX.Element => (
  <div className={layout.container}>
    <div className={layout.content}>
      <h1 className={layout.pageTitle}>
        Registration
      </h1>

      <section className={layout.section}>
        <p className={layout.hint}>
          Please fill in the form below. Fields marked with * are required.
        </p>
      </section>

      <ContentRegistration />
    </div>
  </div>
)

export default Registration

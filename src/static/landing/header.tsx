import * as React from 'react'
import * as classnames from 'classnames'

import * as landing from '../../styles/landing.module.css'

import Logo from './logo'

export default function Header (): JSX.Element {
  return (
    <div className={landing.header}>
      <div
        className={
          classnames(
            landing.section,
            landing.inner
          )
        }
      >
        <Logo />

        <h1 className={landing.heading}>
          Bridging the Gap Between Ag & Hydro
        </h1>

        <h2 className={landing.description}>
          Offering Full Spectrum Products & Services to the Hemp Industry
        </h2>
      </div>
    </div>
  )
}

import * as React from 'react'
import classnames from 'classnames'

import ButtonReturn from './button-return'

import * as layout from '../../styles/layout.module.css'
import * as utility from '../../styles/utility.module.css'

function ControlsReturn (): JSX.Element {
  return (
    <div
      className={
        classnames(
          layout.controls,
          utility.df,
          utility.jcsb
        )
      }
    >
      <ButtonReturn />
    </div>
  )
}

export default React.memo(ControlsReturn)

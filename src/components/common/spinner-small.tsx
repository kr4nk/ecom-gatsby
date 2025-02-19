import * as React from 'react'
import classnames from 'classnames'

import SvgSpinner from '../svg/spinner'

import * as spinner from '../../styles/spinner.module.css'
import * as utility from '../../styles/utility.module.css'

function SpinnerSmall (): JSX.Element {
  return (
    <div
      className={
        classnames(
          spinner.spinnerContentSmall,
          utility.df,
          utility.aic,
          utility.jcc,
          utility.full
        )
      }
    >
      <div
        role='img'
        aria-label='Loading'
        className={spinner.spinnerIconSmall}
      >
        <SvgSpinner />
      </div>
    </div>
  )
}

export default React.memo(SpinnerSmall)

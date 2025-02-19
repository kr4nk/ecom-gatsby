import * as React from 'react'
import classnames from 'classnames'

import Spinner from '../components/common/spinner'

import * as layoutPage from '../styles/layout-page.module.css'
import * as utility from '../styles/utility.module.css'

function Loading (): JSX.Element {
  return (
    <div
      className={
        classnames(
          layoutPage.spinner,
          utility.pa
        )
      }
    >
      <Spinner />
    </div>
  )
}

export default React.memo(Loading)

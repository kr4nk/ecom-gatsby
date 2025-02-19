import * as React from 'react'
import classnames from 'classnames'
import { Link } from 'gatsby'

import ArrowLeftSvg from '../svg/arrow-left'

import * as buttonReturn from '../../styles/button-return.module.css'
import * as buttons from '../../styles/buttons.module.css'

function ButtonReturnSignin (): JSX.Element {
  return (
    <Link
      title='Return to Sign In'
      to='/signin'
      className={
        classnames(
          buttons.button,
          buttons.buttonIcon,
          buttonReturn.buttonReturn
        )
      }
    >
      <div
        role='img'
        aria-hidden
        className={buttons.icon}
      >
        <ArrowLeftSvg />
      </div>

      Return to Sign In
    </Link>
  )
}

export default React.memo(ButtonReturnSignin)

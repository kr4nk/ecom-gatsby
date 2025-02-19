import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../../styles/buttons.module.css'
import * as utility from '../../../styles/utility.module.css'

interface OwnProps {
  disabled: boolean;
}

export default function ButtonCreate ({ disabled }: OwnProps): JSX.Element {
  return (
    <button
      className={
        classnames(
          buttons.button,
          buttons.buttonPrimary,
          buttons.buttonField,
          utility.full
        )
      }
      disabled={disabled}
      type='submit'
    >
      Create New User
    </button>
  )
}

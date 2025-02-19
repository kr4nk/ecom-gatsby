import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  disabled: boolean;
}

const ButtonSignin = ({ disabled }: OwnProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimary,
        utility.full
      )
    }
    disabled={disabled}
    type='submit'
  >
    Sign In
  </button>
)

export default ButtonSignin

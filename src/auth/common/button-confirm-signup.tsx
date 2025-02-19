import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  disabled: boolean;
}

const ButtonConfirmSignup = ({ disabled }: OwnProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimary,
        utility.full,
        utility.bold
      )
    }
    disabled={disabled}
    type='submit'
  >
    Confirm
  </button>
)

export default ButtonConfirmSignup

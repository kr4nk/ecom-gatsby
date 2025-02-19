import classnames from 'classnames'
import * as React from 'react'

import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  disabled: boolean;
}

const ButtonConfirm = ({ disabled }: OwnProps): JSX.Element => (
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
    Confirm
  </button>
)

export default ButtonConfirm

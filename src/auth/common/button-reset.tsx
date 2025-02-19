import classnames from 'classnames'
import * as React from 'react'

import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  disabled: boolean;
}

const ButtonReset = ({ disabled }: OwnProps): JSX.Element => (
  <button
    disabled={disabled}
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimary,
        utility.full,
        utility.bold
      )
    }
    type='submit'
  >
    Set Password
  </button>
)

export default ButtonReset

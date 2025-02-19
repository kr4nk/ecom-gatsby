import * as React from 'react'
import classnames from 'classnames'

import * as utility from '../../styles/utility.module.css'
import * as buttons from '../../styles/buttons.module.css'

interface OwnProps {
  disabled: boolean;
}

const ButtonRegister = ({ disabled }: OwnProps): JSX.Element => (
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
    Register
  </button>
)

export default ButtonRegister

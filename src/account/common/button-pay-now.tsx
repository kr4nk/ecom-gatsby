import * as React from 'react'
import classnames from 'classnames'

import * as utility from '../../styles/utility.module.css'
import * as buttons from '../../styles/buttons.module.css'

interface OwnProps {
  disabled: boolean;
}

const ButtonPayNow = ({ disabled }: OwnProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimary,
        buttons.buttonRow,
        utility.full,
        utility.ttu
      )
    }
    disabled={disabled}
    type='submit'
  >
    Pay Now
  </button>
)

export default ButtonPayNow

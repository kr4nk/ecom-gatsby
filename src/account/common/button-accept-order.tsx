import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonAcceptOrder = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimary,
        utility.mt12,
        utility.full,
        utility.ttu
      )
    }
    disabled={disabled}
    onClick={onClick}
    type='button'
  >
    Accept
  </button>
)

export default ButtonAcceptOrder

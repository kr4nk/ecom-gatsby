import classnames from 'classnames'
import * as React from 'react'

import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonGetSecretKey = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
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
    onClick={onClick}
    type='button'
  >
    Get secret key
  </button>
)

export default ButtonGetSecretKey

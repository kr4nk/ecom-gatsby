import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../styles/buttons.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonSendMessage = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimary,
        buttons.buttonSmall
      )
    }
    disabled={disabled}
    onClick={onClick}
    type='button'
  >
    Send
  </button>
)

export default ButtonSendMessage

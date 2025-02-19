import * as React from 'react'
import classnames from 'classnames'

import SvgEmail from '../../components/svg/email'

import * as buttons from '../../styles/buttons.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonSendOrder = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimaryText,
        buttons.buttonIcon
      )
    }
    onClick={onClick}
    disabled={disabled}
    type='button'
  >
    <div
      role='img'
      aria-hidden
      className={buttons.icon}
    >
      <SvgEmail />
    </div>

    Send to Email
  </button>
)

export default ButtonSendOrder

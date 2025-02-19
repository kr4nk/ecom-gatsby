import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../styles/buttons.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonRefundOpen = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonDanger,
        buttons.buttonSmall
      )
    }
    disabled={disabled}
    onClick={onClick}
    type='button'
  >
    Request Refund
  </button>
)

export default ButtonRefundOpen

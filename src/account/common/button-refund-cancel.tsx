import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../styles/buttons.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonRefundCancel = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonSmall
      )
    }
    disabled={disabled}
    onClick={onClick}
    type='button'
  >
    Cancel
  </button>
)

export default ButtonRefundCancel

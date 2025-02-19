import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../styles/buttons.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonRefundSubmit = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
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
    Submit
  </button>
)

export default ButtonRefundSubmit

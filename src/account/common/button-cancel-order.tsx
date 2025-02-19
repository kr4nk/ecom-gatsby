import * as React from 'react'
import classnames from 'classnames'

import SvgDelete from '../../components/svg/delete'

import * as buttons from '../../styles/buttons.module.css'
import * as actions from '../../styles/actions.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonCancelOrder = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonDangerText,
        buttons.buttonIcon,
        actions.alignRight
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
      <SvgDelete />
    </div>

    Cancel order
  </button>
)

export default ButtonCancelOrder

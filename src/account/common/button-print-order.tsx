import * as React from 'react'
import classnames from 'classnames'

import SvgPrint from '../../components/svg/print'

import * as buttons from '../../styles/buttons.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonPrintOrder = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
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
      <SvgPrint />
    </div>

    Print order
  </button>
)

export default ButtonPrintOrder

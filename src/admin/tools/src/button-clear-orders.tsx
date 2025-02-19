import * as React from 'react'
import classnames from 'classnames'

import ModalConfirm from '../../../layout/modal-confirm'

import * as buttons from '../../../styles/buttons.module.css'
import * as utility from '../../../styles/utility.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick (): void;
}

const ButtonClearOrders = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <ModalConfirm
    isIrreversible
    onConfirm={onClick}
    title={"Are you sure you want to clear all orders in the database. You can't undo this action."}
    id='clear-orders'
  >
    <button
      className={
        classnames(
          buttons.button,
          buttons.buttonPrimary,
          buttons.buttonDanger,
          buttons.buttonField,
          utility.full
        )
      }
      disabled={disabled}
      type='button'
    >
      Clear Orders
    </button>
  </ModalConfirm>
)

export default ButtonClearOrders

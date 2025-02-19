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

const ButtonClearDatabase = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <ModalConfirm
    isIrreversible
    onConfirm={onClick}
    title={"Are you sure you want to clear the database. You can't undo this action."}
    id='clear-database'
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
      Clear Database
    </button>
  </ModalConfirm>
)

export default ButtonClearDatabase

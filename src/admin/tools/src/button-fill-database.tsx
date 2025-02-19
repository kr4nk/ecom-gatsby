import * as React from 'react'
import classnames from 'classnames'

import ModalConfirm from '../../../layout/modal-confirm'

import * as buttons from '../../../styles/buttons.module.css'
import * as utility from '../../../styles/utility.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: () => void;
}

const ButtonFillDatabase = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <ModalConfirm
    isIrreversible
    onConfirm={onClick}
    title={"Are you sure you want to fill in the database. You can't undo this action."}
    id='fill-database'
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
      Append data from Google Spreadsheet
    </button>
  </ModalConfirm>
)

export default ButtonFillDatabase

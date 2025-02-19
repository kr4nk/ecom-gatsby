import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../../styles/buttons.module.css'
import * as utility from '../../../styles/utility.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonRebuildSite = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimary,
        buttons.buttonField,
        utility.full
      )
    }
    disabled={disabled}
    onClick={onClick}
    type='button'
  >
    Rebuild Site on Netlify
  </button>
)

export default ButtonRebuildSite

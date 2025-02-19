import * as React from 'react'

import InputCode from '../signin-confirm/input-code'
import ErrorBlock from '../signin-confirm/error-block'
import ButtonConfirm from '../signin-confirm/button-confirm'

import * as sign from '../../styles/sign.module.css'
import * as grid from '../../styles/grid.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

const FormSigninConfirm = ({ onSubmit }: OwnProps): JSX.Element => (
  <form
    className={sign.form}
    onSubmit={onSubmit}
  >
    <div className={grid.row}>
      <InputCode />
    </div>

    <ErrorBlock />

    <ButtonConfirm />
  </form>
)

export default FormSigninConfirm

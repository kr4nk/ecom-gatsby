import * as React from 'react'

import InputEmail from '../signup-confirm/input-email'
import InputCode from '../signup-confirm/input-code'
import ButtonConfirmSignup from '../signup-confirm/button-confirm-signup'
import ErrorBlock from '../signup-confirm/error-block'

import * as sign from '../../styles/sign.module.css'
import * as grid from '../../styles/grid.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

const FormSignupConfirm = ({ onSubmit }: OwnProps): JSX.Element => (
  <form
    className={sign.form}
    onSubmit={onSubmit}
  >
    <div className={grid.row}>
      <InputEmail />

      <InputCode />
    </div>

    <ErrorBlock />

    <ButtonConfirmSignup />
  </form>
)

export default FormSignupConfirm

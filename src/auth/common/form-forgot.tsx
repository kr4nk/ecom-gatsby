import * as React from 'react'

import InputEmail from '../forgot/input-email'
import ErrorBlock from '../forgot/error-block'
import ButtonForgotSubmit from '../forgot/button-forgot-submit'

import * as forgotPassword from '../../styles/forgot-password.module.css'
import * as grid from '../../styles/grid.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

const FormForgot = ({ onSubmit }: OwnProps): JSX.Element => (
  <form
    className={forgotPassword.form}
    onSubmit={onSubmit}
  >
    <div className={grid.row}>
      <InputEmail />
    </div>

    <ErrorBlock />

    <ButtonForgotSubmit />
  </form>
)

export default FormForgot

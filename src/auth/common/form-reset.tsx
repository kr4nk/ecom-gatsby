import * as React from 'react'
import classnames from 'classnames'

import { useCapsLock } from '../../utils/use-caps-lock'

import PasswordResetHint from '../reset/password-hint'
import InputPasswordReset from '../reset/input-password'
import InputPasswordConfirmReset from '../reset/input-password-confirm'
import InputCodeConfirmReset from '../reset/input-code-confirm'
import ErrorBlock from '../reset/error-block'
import ButtonResetAndSignIn from '../reset/button-reset-and-signin'

import * as sign from '../../styles/sign.module.css'
import * as grid from '../../styles/grid.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

// eslint-disable-next-line perf-standard/check-function-inline
function FormReset ({ onSubmit }: OwnProps): JSX.Element {
  const [ capsLock, onKeyEvent ] = useCapsLock()

  return (
    <form
      onSubmit={onSubmit}
      className={
        classnames(
          sign.form,
          utility.mb24
        )
      }
    >
      <PasswordResetHint capsLock={capsLock} />

      <div className={grid.row}>
        <InputPasswordReset
          onKeyUp={onKeyEvent}
        />

        <InputPasswordConfirmReset
          onKeyUp={onKeyEvent}
        />

        <InputCodeConfirmReset />
      </div>

      <ErrorBlock />

      <ButtonResetAndSignIn />
    </form>
  )
}

export default FormReset

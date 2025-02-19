import * as React from 'react'

import { useCapsLock } from '../../utils/use-caps-lock'

import InputEmail from '../signup/input-email'
import PasswordHint from '../signup/password-hint'
import InputPassword from '../signup/input-password'
import InputPasswordConfirm from '../signup/input-password-confirm'
import Agreed from '../signup/agreed'
import ErrorBlock from '../signup/error-block'
import ButtonSignup from '../signup/button-signup'

import * as sign from '../../styles/sign.module.css'
import * as grid from '../../styles/grid.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

export default function FormSignup ({ onSubmit }: OwnProps): JSX.Element {
  const [ capsLock, onKeyEvent ] = useCapsLock()

  return (
    <form
      className={sign.form}
      onSubmit={onSubmit}
    >
      <div className={grid.row}>
        <InputEmail />
      </div>

      <PasswordHint capsLock={capsLock} />

      <div className={grid.row}>
        <InputPassword
          onKeyUp={onKeyEvent}
        />

        <InputPasswordConfirm
          onKeyUp={onKeyEvent}
        />
      </div>

      <Agreed />

      <ErrorBlock />

      <ButtonSignup />
    </form>
  )
}

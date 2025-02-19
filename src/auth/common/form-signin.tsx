import * as React from 'react'

import { useCapsLock } from '../../utils/use-caps-lock'

import InputEmail from '../signin/input-email'
import InputPassword from '../signin/input-password'
import WarningCapsLock from '../signin/warning-caps-lock'
import RememberMe from '../signin/remember-me'
import ErrorBlock from '../signin/error-block'
import ButtonSignin from '../signin/button-signin'

import * as sign from '../../styles/sign.module.css'
import * as grid from '../../styles/grid.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

export default function FormSignin ({ onSubmit }: OwnProps): JSX.Element {
  const [ capsLock, onKeyEvent ] = useCapsLock()

  return (
    <form
      className={sign.form}
      onSubmit={onSubmit}
    >
      <div className={grid.row}>
        <InputEmail />

        <WarningCapsLock
          capsLock={capsLock}
        />

        <InputPassword
          onKeyUp={onKeyEvent}
        />
      </div>

      <RememberMe />

      <ErrorBlock />

      <ButtonSignin />
    </form>
  )
}

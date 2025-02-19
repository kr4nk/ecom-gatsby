import * as React from 'react'

import { useCapsLock } from '../../utils/use-caps-lock'

import InputPassword from '../password/input-password'
import InputPasswordConfirm from '../password/input-password-confirm'
import PasswordHint from '../password/password-hint'
import Agreed from '../password/agreed'
import ButtonReset from '../password/button-reset'

import * as sign from '../../styles/sign.module.css'
import * as grid from '../../styles/grid.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

function FormPassword ({ onSubmit }: OwnProps): JSX.Element {
  const [ capsLock, onKeyEvent ] = useCapsLock()

  return (
    <form
      className={sign.form}
      onSubmit={onSubmit}
    >
      <div className={grid.row}>
        <InputPassword
          onKeyUp={onKeyEvent}
        />

        <InputPasswordConfirm
          onKeyUp={onKeyEvent}
        />
      </div>

      <PasswordHint capsLock={capsLock} />

      <Agreed />

      <ButtonReset />
    </form>
  )
}

export default FormPassword

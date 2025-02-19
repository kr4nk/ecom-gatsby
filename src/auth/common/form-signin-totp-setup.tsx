import * as React from 'react'

import ButtonGetSecretKey from '../signin-totp-setup/button-get-secret-key'
import QRcode from '../signin-totp-setup/qrcode'

import * as sign from '../../styles/sign.module.css'

const FormSigninTotpSetup = (): JSX.Element => (
  <div className={sign.form}>
    <ButtonGetSecretKey />

    <QRcode />
  </div>
)

export default FormSigninTotpSetup

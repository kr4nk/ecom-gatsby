import * as React from 'react'
import classnames from 'classnames'

import ButtonReturnToSignIn from '../../components/common/button-return-signin'

import FormForgot from './form-forgot'

import * as forgotPassword from '../../styles/forgot-password.module.css'
import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

const Forgot = (): JSX.Element => (
  <div className={sign.signin}>
    <div className={sign.container}>
      <h1
        className={
          classnames(
            forgotPassword.title,
            utility.bold,
            utility.tac
          )
        }
      >
        Forgot password
      </h1>

      <p className={forgotPassword.description}>
        Enter your email and we will send you link allowing to reset your password.
      </p>

      <FormForgot />

      <ButtonReturnToSignIn />
    </div>
  </div>
)

export default Forgot

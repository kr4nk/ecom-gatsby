import * as React from 'react'
import classnames from 'classnames'

import ReturnToSignInButton from '../../components/common/button-return-signin'

import FormReset from './form-reset'

import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

const Reset = (): JSX.Element => (
  <div className={sign.signin}>
    <div className={sign.container}>
      <h1
        className={
          classnames(
            sign.title,
            utility.bold,
            utility.tac
          )
        }
      >
        Password Reset
      </h1>

      <FormReset />

      <ReturnToSignInButton />
    </div>
  </div>
)

export default Reset

import * as React from 'react'
import { navigate } from '@reach/router'
import classnames from 'classnames'

import Cognito from '../../aws/cognito'

import FormPassword from './form-password'

import * as sign from '../../styles/sign.module.css'
import * as utility from '../../styles/utility.module.css'

export default function Password (): JSX.Element {
  React.useEffect(
    function onMount (): void {
      if (Cognito.get() === null) {
        navigate('/signin')
      }
    }, []
  )

  return (
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
          Please, Set Your Password
        </h1>

        <FormPassword />
      </div>
    </div>
  )
}

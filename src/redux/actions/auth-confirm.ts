import { navigate } from '@reach/router'
import { event, exception } from 'react-ga'
import Auth from '@aws-amplify/auth'

import Cognito from '../../aws/cognito'
import { CognitoError } from '../../aws/amplify'

import toaster from '../../utils/toast'
import { emailRegexp } from '../../utils/regexp'

import { getFieldEmail } from '../selectors/auth-signup'
import { getFieldCode } from '../selectors/auth-confirm'

import { getUserData } from './user'

import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  fetchComplete
} from './fields'

import {
  GetState,
  Dispatch,
  FieldsAction
} from '../../types/common'

import { AUTH_CONFIRM, VALUE } from '../selector-consts'

const path = [AUTH_CONFIRM]

export function getSecretKey (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      fetchRequest({ path })
    )

    const cognito = Cognito.get()

    if (cognito === null) {
      return
    }

    return Auth.setupTOTP(cognito)
      .then(function result (data): void {
        dispatch(
          fetchComplete({
            path,
            link: [
              'otpauth://totp/AWSCognito:',
              cognito.getUsername(),
              '?secret=',
              data,
              '&issuer=AWSCognito'
            ].join('')
          })
        )
      })
      .catch(function error (err: CognitoError): void {
        const errorMessage = err.message

        exception({
          description: `[Setup TOTP] ${errorMessage}`,
          fatal: true
        })

        toaster.showError(`Authentication GetSecretKey Error: ${errorMessage}`)

        dispatch(
          fetchFailure({
            path,
            errorMessage
          })
        )
      })
  }
}

export function confirmSignIn (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const code = getFieldCode(getState())
      .get(VALUE)

    if (code.length === 0) {
      return
    }

    dispatch(
      fetchRequest({ path })
    )

    const cognito = Cognito.get()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mfaType = (cognito as any).challengeName === 'SOFTWARE_TOKEN_MFA'
      ? 'SOFTWARE_TOKEN_MFA'
      : null

    return Auth.confirmSignIn(cognito, code, mfaType)
      .then(function result (): void {
        getUserData(dispatch)

        dispatch(
          fetchSuccess({ path })
        )

        event({
          category: 'User',
          action: 'Signed in to Account'
        })
      })
      .catch(function error (err: CognitoError): void {
        const errorMessage = err.message

        toaster.showError(`Authentication Error: ${errorMessage}`)

        dispatch(
          fetchFailure({
            path,
            errorMessage
          })
        )

        exception({
          description: `[Auth Confirn Signin] ${errorMessage}`,
          fatal: true
        })
      })
  }
}

export function confirmSignUp (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()

    const email = getFieldEmail(state).get(VALUE)
    const code = getFieldCode(state).get(VALUE)

    const valid = (code.length > 0) &&
      (
        email.length > 5 &&
        email.length < 321
      ) && emailRegexp(email)

    if (!valid) {
      return
    }

    dispatch(
      fetchRequest({ path })
    )

    return Auth.confirmSignUp(email, code)
      .then(async function result (result): Promise<void> {
        event({
          category: 'User',
          action: 'Created an Account'
        })

        await navigate('/signin', { replace: true })

        dispatch(
          fetchSuccess({
            ...result,
            path
          })
        )
      })
      .catch(function error (err: CognitoError): void {
        const errorMessage = err.message

        toaster.showError(`Authentication Error: ${errorMessage}`)

        dispatch(
          fetchFailure({
            path,
            errorMessage
          })
        )

        exception({
          description: `[Auth Confirm Signup] ${errorMessage}`,
          fatal: true
        })
      })
  }
}

export function verifyTotpToken (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const code = getFieldCode(getState())
      .get(VALUE)

    if (code.length === 0) {
      return
    }

    dispatch(
      fetchRequest({ path })
    )

    const cognito = Cognito.get()

    return Auth.verifyTotpToken(cognito, code)
      .then(function result (): void {
        Auth.setPreferredMFA(cognito, 'TOTP')

        getUserData(dispatch)

        dispatch(
          fetchSuccess({ path })
        )
      })
      .catch(function error (err: CognitoError): void {
        const errorMessage = err.message

        exception({
          description: `[Auth TOTP Verification] ${errorMessage}`,
          fatal: true
        })

        toaster.showError(`Token Verification Error: ${errorMessage}`)

        dispatch(
          fetchFailure({
            path,
            errorMessage
          })
        )
      })
  }
}

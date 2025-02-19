import { createAction } from 'redux-actions'
import { exception } from 'react-ga'
import toaster from '../../utils/toast'

import { getEndpoint } from '../../aws/amplify'

import {
  APP_TOGGLE_MOBILE_MENU,
  APP_SET_RECAPTCHA_VALID
} from '../action-types'

import {
  Dispatch,
  FieldsAction
} from '../../types/common'

export const toggleMobileMenu =
  createAction(APP_TOGGLE_MOBILE_MENU)

export const setRecaptchaValid =
  createAction(APP_SET_RECAPTCHA_VALID)

const ENDPOINT = getEndpoint('recaptcha')

export function verifyReCapture (token: string): FieldsAction {
  return async function thunk (dispatch: Dispatch): Promise<void> {
    try {
      const { success, error } = await fetch(`${ENDPOINT}/?token=${token}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json'
        }
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(function asJSON (request): any { return request.json() })

      if (error) {
        exception({
          description: `[Recaptcha verification] ${error}`,
          fatal: true
        })

        toaster.showError(error)
      }

      dispatch(
        setRecaptchaValid({
          valid: success
        })
      )
    } catch (err) {
      exception({
        description: `[Recaptcha verification] ${err}`,
        fatal: true
      })

      toaster.showError(err)

      dispatch(
        setRecaptchaValid({
          valid: false
        })
      )
    }
  }
}

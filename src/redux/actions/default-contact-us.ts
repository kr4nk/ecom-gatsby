import { exception } from 'react-ga'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'
import { storage } from '../../utils/storage'

import { apiUnauthorizedRequest } from './common'

import { getIsRecaptchaValid } from '../selectors/app'

import {
  getFieldMessage,
  getFieldEmail
} from '../selectors/default-contact-us'

import {
  Dispatch,
  GetState,
  FieldsAction
} from '../../types/common'

import {
  DEFAULT_CONTACT_US,
  USER_ID,
  VALUE
} from '../selector-consts'

const ENDPOINT = getEndpoint('contact-us')

const path = [DEFAULT_CONTACT_US]

export function sendEmail (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    if (!getIsRecaptchaValid(getState())) {
      exception({
        description: 'Attempt to Send Contact Us form, ReCaptcha is invalid! You are robot :)',
        fatal: false
      })

      return toaster.showError(`SignIn Error: Google ReCaptcha is invalid! You are robot :(, please try again, or reload page :)`)
    }

    dispatch(
      apiUnauthorizedRequest({
        path,
        method: 'POST',
        debugName: 'sendEmail',
        url: `${ENDPOINT}/`,
        headers: {
          'Content-Type': 'application/json'
        },
        getBody (getState): string {
          return JSON.stringify({
            [USER_ID]: storage.getItem(USER_ID) || 'undefined',
            message: getFieldMessage(getState()).get(VALUE),
            email: getFieldEmail(getState()).get(VALUE)
          })
        }
      })
    )
  }
}

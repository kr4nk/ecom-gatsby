import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

import { ReduxState } from '../../types/common'

import {
  APP_TOGGLE_MOBILE_MENU,
  APP_SET_RECAPTCHA_VALID,

  LOGOUT
} from '../action-types'

import {
  BANK_ACCOUNT,
  VALID,
  MENU,
  IS_OPEN,
  RECAPTCHA,
  NUMBER,
  ROUTING,
  DIRECT,
  WIRE
} from '../selector-consts'

const initialState = fromJS({
  [MENU]: {
    [IS_OPEN]: false
  },
  [RECAPTCHA]: {
    [VALID]: false
  },
  [BANK_ACCOUNT]: {
    [NUMBER]: '5466353967',
    [ROUTING]: {
      [DIRECT]: '121042882',
      [WIRE]: '121000248'
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReduxState, any>({
  [APP_TOGGLE_MOBILE_MENU]: function reducer (state): ReduxState {
    return state
      .updateIn(
        [MENU, IS_OPEN],
        function inverse (bool: boolean): boolean {
          return !bool
        }
      )
  },
  [APP_SET_RECAPTCHA_VALID]: function reducer (state, { payload: { valid } }): ReduxState {
    return state
      .setIn([RECAPTCHA, VALID], valid)
  },

  [LOGOUT]: function reset (): ReduxState {
    return initialState
  }
}, initialState)

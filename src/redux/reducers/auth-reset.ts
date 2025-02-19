import { fromJS } from 'immutable'

import {
  ReduxState,
  ReduxAction
} from '../../types/common'

import {
  IS_FETCHING,
  ERROR,
  ERROR_MESSAGE,
  PASSWORD,
  AUTH_RESET,
  PASSWORD_CONFIRM,
  CODE,
  PATH,
  VALUE,
  INVALID,
  VALID,
  PASSWORD_LENGTH,
  PASSWORD_CAPITAL,
  PASSWORD_DIGIT,
  PASSWORD_LOWERCASE
} from '../selector-consts'

export const initialFields = {
  [PASSWORD]: {
    [PATH]: [AUTH_RESET, PASSWORD],
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false,

    [PASSWORD_LENGTH]: false,
    [PASSWORD_CAPITAL]: false,
    [PASSWORD_DIGIT]: false,
    [PASSWORD_LOWERCASE]: false
  },
  [PASSWORD_CONFIRM]: {
    [PATH]: [AUTH_RESET, PASSWORD_CONFIRM],
    [VALID]: false,
    [INVALID]: false,
    [VALUE]: ''
  },
  [CODE]: {
    [PATH]: [AUTH_RESET, CODE],
    [VALID]: false,
    [INVALID]: false,
    [VALUE]: ''
  },
  // Request
  [IS_FETCHING]: false,
  [ERROR]: false,
  [ERROR_MESSAGE]: ''
}

export const fetchSuccess = (state: ReduxState): ReduxState =>
  state
    .merge({
      [IS_FETCHING]: false,
      [ERROR]: false,
      [ERROR_MESSAGE]: ''
    })

export const fetchFailure = (state: ReduxState, { payload: { path: _path, ...rest } }: ReduxAction): ReduxState =>
  state
    .mergeDeep({
      [IS_FETCHING]: false,
      [ERROR]: true,
      ...rest
    })

export const logOut = (state: ReduxState): ReduxState =>
  state
    .merge(fromJS(initialFields))

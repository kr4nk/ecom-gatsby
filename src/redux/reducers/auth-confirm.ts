import { fromJS } from 'immutable'

import {
  ReduxState,
  ReduxAction
} from '../../types/common'

import {
  IS_FETCHING,
  ERROR,
  ERROR_MESSAGE,
  LINK,
  CODE,
  PATH,
  AUTH_CONFIRM,
  VALUE,
  VALID,
  INVALID
} from '../selector-consts'

export const initialFields = {
  [LINK]: '',
  [CODE]: {
    [PATH]: [AUTH_CONFIRM, CODE],
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false,
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

export const fetchComplete = (state: ReduxState, { payload: { path: _path, ...rest } }: ReduxAction): ReduxState =>
  state
    .mergeDeep({
      [IS_FETCHING]: false,
      [ERROR]: false,
      [ERROR_MESSAGE]: '',
      ...rest
    })

export const logOut = (state: ReduxState): ReduxState =>
  state
    .merge(fromJS(initialFields))

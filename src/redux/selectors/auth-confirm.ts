import { ReduxState, TImmutableInput } from '../../types/common'

import {
  FIELDS,
  IS_FETCHING,
  AUTH_CONFIRM,
  ERROR_MESSAGE,
  CODE,
  LINK
} from '../selector-consts'

export const getIsFetching = (state: ReduxState): boolean =>
  state
    .getIn([FIELDS, AUTH_CONFIRM, IS_FETCHING])

export const getErrorMessage = (state: ReduxState): string =>
  state
    .getIn([FIELDS, AUTH_CONFIRM, ERROR_MESSAGE])

export const getConfirmLink = (state: ReduxState): string =>
  state
    .getIn([FIELDS, AUTH_CONFIRM, LINK])

export const getFieldCode = (state: ReduxState): TImmutableInput =>
  state
    .getIn([FIELDS, AUTH_CONFIRM, CODE])

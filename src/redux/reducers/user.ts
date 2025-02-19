import { fromJS } from 'immutable'

import {
  ReduxState,
  ReduxAction
} from '../../types/common'

import { ROLE_UNREGISTERED } from '../../const/roles'

import {
  IS_FETCHING,
  ERROR,
  ERROR_MESSAGE,
  DATA,
  IS_LOGGED_IN,
  ROLE,
  ID,
  FIRST_NAME,
  LAST_NAME,
  ZIP,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CITY,
  BUSINESS_NAME,
  PHONE,
  BUSINESS_PHONE,
  STATE,
  IS_VERIFIED,
  COUNTRY,
  CREATED_AT,
  EMAIL,
  NAME,
  SIZE,
  GROUPS,
  PERMIT,
  TYPE,
  SRC,
  EXEMPTION
} from '../selector-consts'

export const initialFields = {
  [IS_FETCHING]: false,
  [ERROR]: false,
  [ERROR_MESSAGE]: '',
  [IS_LOGGED_IN]: false,
  [DATA]: {
    [ID]: '', // TODO: provide user id for Google Analytics
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [ROLE]: ROLE_UNREGISTERED,
    [ZIP]: '',
    [ADDRESS_LINE_1]: '',
    [ADDRESS_LINE_2]: '',
    [CITY]: '',
    [BUSINESS_NAME]: '',
    [PHONE]: '',
    [BUSINESS_PHONE]: '',
    [STATE]: '',
    [IS_VERIFIED]: false,
    [COUNTRY]: '',
    [CREATED_AT]: 0,
    [EMAIL]: '',
    [PERMIT]: {
      [NAME]: '',
      [TYPE]: '',
      [SIZE]: '',
      [SRC]: ''
    },
    [EXEMPTION]: {
      [NAME]: '',
      [TYPE]: '',
      [SIZE]: '',
      [SRC]: ''
    }
  }, // User data
  [GROUPS]: []
}

export function fetchSuccess (state: ReduxState, { payload: { user, groups } }: ReduxAction): ReduxState {
  return state
    .mergeDeep({
      [DATA]: {
        [ROLE]: ROLE_UNREGISTERED,
        ...user,
        [PERMIT]: {
          [SRC]: (user && user.fileResellersPermit) || ''
        },
        [EXEMPTION]: {
          [SRC]: (user && user.fileTaxExemptionForm) || ''
        }
      },
      [IS_LOGGED_IN]: true,
      [IS_FETCHING]: false,
      [ERROR]: false,
      [ERROR_MESSAGE]: ''
    })
    .set(GROUPS, fromJS(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      groups.map(function mapper (group: { products: any[] }): any {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return group.products.reduce(function reducer (acc, item): any {
          acc[item.versionId] = item.discount

          return acc
        }, {})
      })
    ))
}

export const fetchFailure = (state: ReduxState, { payload: { errorMessage } }: ReduxAction): ReduxState =>
  state
    .merge({
      [ERROR]: true,
      [ERROR_MESSAGE]: errorMessage,
      [IS_FETCHING]: false,
      [IS_LOGGED_IN]: false
    })

export const fetchComplete = (state: ReduxState, { payload }: ReduxAction): ReduxState =>
  state
    .mergeDeep({
      [IS_FETCHING]: false,
      [IS_LOGGED_IN]: false,
      [ERROR]: false,
      [ERROR_MESSAGE]: '',
      ...payload
    })

export const logOut = (state: ReduxState): ReduxState =>
  state
    .merge(fromJS(initialFields))

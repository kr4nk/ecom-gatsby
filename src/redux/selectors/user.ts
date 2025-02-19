import { ReduxState } from '../../types/common'

import {
  TUserData,
  TUserGroups,
  TUserExemption,
  TUserPermit
} from '../../types/user'

import {
  FIELDS,
  IS_FETCHING,
  IS_LOGGED_IN,
  ERROR,
  ERROR_MESSAGE,
  USER,
  DATA,
  ROLE,
  GROUPS,
  EXEMPTION,
  PERMIT
} from '../selector-consts'

export function getIsFetching (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, USER, IS_FETCHING])
}

export function getIsLoggedIn (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, USER, IS_LOGGED_IN])
}

export function getIsError (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, USER, ERROR])
}

export function getErrorMessage (state: ReduxState): string {
  return state
    .getIn([FIELDS, USER, ERROR_MESSAGE])
}

export function getUser (state: ReduxState): TUserData {
  return state
    .getIn([FIELDS, USER, DATA])
}

export function getUserRole (state: ReduxState): number {
  return state
    .getIn([FIELDS, USER, DATA, ROLE])
}

export function getUserGroups (state: ReduxState): TUserGroups {
  return state
    .getIn([FIELDS, USER, GROUPS])
}

export function getUserExemption (state: ReduxState): TUserExemption {
  return getUser(state).get(EXEMPTION)
}

export function getUserPermit (state: ReduxState): TUserPermit {
  return getUser(state).get(PERMIT)
}

export function getProductVersionDiscountValue (groups: TUserGroups, versionId: string): number {
  const list = groups.reduce(function reducer (acc, group): number[] {
    const discount = group.get(versionId, 0)

    if (discount > 0) {
      acc.push(discount)
    }

    return acc
  }, [0])

  return Math.max(...list)
}

export function getProductVersionDiscount (state: ReduxState, versionId: string): number {
  return getProductVersionDiscountValue(getUserGroups(state), versionId)
}

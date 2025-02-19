import { ReduxState } from '../../types/common'

import {
  BANK_ACCOUNT,
  APP,
  MENU,
  IS_OPEN,
  VALID,
  RECAPTCHA,
  NUMBER,
  ROUTING,
  DIRECT,
  WIRE
} from '../selector-consts'

export function getIsMenuOpen (state: ReduxState): boolean {
  return state
    .getIn([APP, MENU, IS_OPEN])
}

export function getIsRecaptchaValid (state: ReduxState): boolean {
  return state
    .getIn([APP, RECAPTCHA, VALID])
}

export function getBankAccountNumber (state: ReduxState): string {
  return state
    .getIn([APP, BANK_ACCOUNT, NUMBER])
}

export function getBankAccountRoutingDirect (state: ReduxState): string {
  return state
    .getIn([APP, BANK_ACCOUNT, ROUTING, DIRECT])
}

export function getBankAccountRoutingWire (state: ReduxState): string {
  return state
    .getIn([APP, BANK_ACCOUNT, ROUTING, WIRE])
}

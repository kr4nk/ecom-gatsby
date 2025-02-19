import { fromJS } from 'immutable'

import {
  ReduxState,
  ReduxAction
} from '../../types/common'

import { IncCart } from '../../types/network'

import {
  IS_FETCHING,
  ERROR,
  ERROR_MESSAGE,
  USER_CART,
  PATH,
  LIST,
  IDS,
  ITEMS,
  MAP,
  TOTAL,
  VALUE,
  ID,
  INVALID,
  VALID,
  CHECKED,
  NAME,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CITY,
  COUNTRY,
  STATE_US,
  STATE_CANADA,
  ZIP,
  FETCHING_VERSIONS,
  ORDER_ID,
  SUBTOTAL,
  STATE_TAX,
  COUNTY_TAX,
  SHIPPING,
  COST,
  WAREHOUSE,
  FROM_WAREHOUSE_TO_CUSTOM,
  FETCHING_COUNTER
} from '../selector-consts'

export const initialFields = {
  [IS_FETCHING]: false,
  [ERROR]: false,
  [ERROR_MESSAGE]: '',
  [FETCHING_VERSIONS]: {
    [PATH]: [USER_CART, FETCHING_VERSIONS],
    [LIST]: []
  },
  [IDS]: {
    [PATH]: [USER_CART, IDS],
    [LIST]: []
  },
  [ITEMS]: {
    [PATH]: [USER_CART, ITEMS],
    [MAP]: {}
  },
  [ORDER_ID]: '',
  [SUBTOTAL]: 0,
  [STATE_TAX]: 0,
  [COUNTY_TAX]: 0,
  [TOTAL]: 0,
  [SHIPPING]: {
    [PATH]: [USER_CART, SHIPPING],
    [VALUE]: 'business',
    [NAME]: 'Delivery to your business address',
    [COST]: 'Submit order to calculate'
  },
  [WAREHOUSE]: {
    [PATH]: [USER_CART, WAREHOUSE],
    [ID]: '',
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false
  },
  [FROM_WAREHOUSE_TO_CUSTOM]: {
    [PATH]: [USER_CART, FROM_WAREHOUSE_TO_CUSTOM],
    [CHECKED]: false
  },
  [ADDRESS_LINE_1]: {
    [PATH]: [USER_CART, ADDRESS_LINE_1],
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false
  },
  [ADDRESS_LINE_2]: {
    [PATH]: [USER_CART, ADDRESS_LINE_2],
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false
  },
  [CITY]: {
    [PATH]: [USER_CART, CITY],
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false
  },
  [COUNTRY]: {
    [PATH]: [USER_CART, COUNTRY],
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false
  },
  [STATE_US]: {
    [PATH]: [USER_CART, STATE_US],
    [ID]: '',
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false
  },
  [STATE_CANADA]: {
    [PATH]: [USER_CART, STATE_CANADA],
    [ID]: '',
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false
  },
  [ZIP]: {
    [PATH]: [USER_CART, ZIP],
    [VALUE]: '',
    [VALID]: false,
    [INVALID]: false
  }
}

interface SuccessResult {
  cart: IncCart;
}

interface VersionQuantity {
  [key: string]: number;
}

interface ProductMap {
  [key: string]: VersionQuantity;
}

export const fetchSuccess = (state: ReduxState, {
  payload: {
    cart: {
      orderId,
      items
    }
  }
}: ReduxAction<SuccessResult>): ReduxState => {
  const list: string[] = []
  const assoc: ProductMap = {}

  for (let item of items) {
    let product = assoc[item.productId]

    if (product === undefined) {
      product = assoc[item.productId] = {}
    }

    for (let version of item.versions) {
      product[version.versionId] = version.value
    }

    list.push(item.productId)
  }

  return state
    .setIn([IDS, LIST], fromJS(list))
    .setIn([ITEMS, MAP], fromJS(assoc))
    .merge({
      [ORDER_ID]: orderId
    })
}

export const incrFetchingCounter = (state: ReduxState): ReduxState =>
  state
    .update(FETCHING_COUNTER, function update (counter: number): number { return counter + 1 })

export const decrFetchingCounter = (state: ReduxState): ReduxState =>
  state
    .update(FETCHING_COUNTER, function update (counter: number): number { return counter - 1 })

export const clearCart = (state: ReduxState): ReduxState =>
  state
    .merge(fromJS(initialFields))

export const logOut = clearCart

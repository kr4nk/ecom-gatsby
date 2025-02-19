import { createSelector } from 'reselect'

import { roundToTwo } from '../../utils/number'

import { COUNTRY_US } from '../../const/countries'

import { getProductsItems } from './user-products'
import { getWarehousesItems } from './user-warehouses'

import {
  getUser,
  getUserGroups,
  getProductVersionDiscountValue
} from './user'

import {
  ReduxState,
  TImmutableIds,
  TImmutableFieldMap,
  TImmutableList,
  TImmutableInput,
  TImmutableCheckbox,
  TImmutableCombobox
} from '../../types/common'

import {
  TProduct,
  TProducts,
  TUserCart,
  TWarehouse,
  TWarehouses,
  TCartShipping
} from '../../types/account'

import { TUserData, TUserGroups } from '../../types/user'

import {
  FIELDS,
  IS_FETCHING,
  USER_CART,
  IDS,
  ITEMS,
  ID,
  LIST,
  COUNTRY,
  STATE_US,
  STATE_CANADA,
  CITY,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  ZIP,
  STATE,
  VALUE,
  FETCHING_VERSIONS,
  ORDER_ID,
  MAP,
  SHIPPING,
  FROM_WAREHOUSE_TO_CUSTOM,
  WAREHOUSE,
  VERSIONS,
  PRICE
} from '../selector-consts'

export function getIsFetching (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, USER_CART, IS_FETCHING])
}

export function getIsFetchingVersions (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, USER_CART, FETCHING_VERSIONS, LIST]).size > 0
}

export function getOrderId (state: ReduxState): string {
  return state
    .getIn([FIELDS, USER_CART, ORDER_ID])
}

export function getFieldCartIds (state: ReduxState): TImmutableList {
  return state
    .getIn([FIELDS, USER_CART, IDS])
}

export function getCartIds (state: ReduxState): TImmutableIds {
  return getFieldCartIds(state)
    .get(LIST)
}

export function getCartSize (state: ReduxState): number {
  return getCartIds(state).size
}

export function getFieldCartItems (state: ReduxState): TImmutableFieldMap<TUserCart> {
  return state
    .getIn([FIELDS, USER_CART, ITEMS])
}

export function getCartItems (state: ReduxState): TUserCart {
  return getFieldCartItems(state)
    .get(MAP)
}

export function getFieldCountry (state: ReduxState): TImmutableInput {
  return state
    .getIn([FIELDS, USER_CART, COUNTRY])
}

export function getFieldStateUs (state: ReduxState): TImmutableCombobox {
  return state
    .getIn([FIELDS, USER_CART, STATE_US])
}

export function getFieldStateCanada (state: ReduxState): TImmutableCombobox {
  return state
    .getIn([FIELDS, USER_CART, STATE_CANADA])
}

export function getFieldCity (state: ReduxState): TImmutableInput {
  return state
    .getIn([FIELDS, USER_CART, CITY])
}

export function getFieldAddressLine1 (state: ReduxState): TImmutableInput {
  return state
    .getIn([FIELDS, USER_CART, ADDRESS_LINE_1])
}

export function getFieldAddressLine2 (state: ReduxState): TImmutableInput {
  return state
    .getIn([FIELDS, USER_CART, ADDRESS_LINE_2])
}

export function getFieldZip (state: ReduxState): TImmutableInput {
  return state
    .getIn([FIELDS, USER_CART, ZIP])
}

export function getCartShipping (state: ReduxState): TCartShipping {
  return state
    .getIn([FIELDS, USER_CART, SHIPPING])
}

export function getFieldFromWarehouseToCustom (state: ReduxState): TImmutableCheckbox {
  return state
    .getIn([FIELDS, USER_CART, FROM_WAREHOUSE_TO_CUSTOM])
}

export function getFieldWarehouse (state: ReduxState): TImmutableCombobox {
  return state
    .getIn([FIELDS, USER_CART, WAREHOUSE])
}

interface ProductVersion {
  productId: string;
  versionId: string;
}

export function getProductVersionQuantity (state: ReduxState, { productId, versionId }: ProductVersion): number {
  return getCartItems(state)
    .getIn([productId, versionId], 0)
}

interface AddressInfo {
  addressLine1: string;
  addressLine2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

function getAddress (state: AddressInfo): string {
  const address: string[] = [
    state.country,
    state.state,
    state.city,
    state.addressLine1
  ]

  if (
    state.addressLine2 &&
    state.addressLine2.length > 0
  ) {
    address.push(
      state.addressLine2
    )
  }

  address.push(
    state.zip
  )

  return address.join(', ')
}

export const getBusinessAddress = createSelector(
  [ getUser ],
  function getBusinessAddress (user: TUserData): string {
    if (user.size === 0) {
      return ''
    }

    return getAddress({
      [ADDRESS_LINE_1]: user.get(ADDRESS_LINE_1),
      [ADDRESS_LINE_2]: user.get(ADDRESS_LINE_2),
      [COUNTRY]: user.get(COUNTRY),
      [STATE]: user.get(STATE),
      [CITY]: user.get(CITY),
      [ZIP]: user.get(ZIP)
    })
  }
)

export function getWarehouseId (state: ReduxState): string {
  return getFieldWarehouse(state)
    .get(ID)
}

export const getWarehouse = createSelector(
  [
    getWarehouseId,
    getWarehousesItems
  ],
  function getWarehouse (id: string, items: TWarehouses): TWarehouse | undefined {
    return items.get(id)
  }
)

interface AddressFieldsValues {
  addressLine1: string;
  addressLine2: string;
  country: string;
  stateUs: string;
  stateCanada: string;
  city: string;
  zip: string;
}

export function getCartFields (state: ReduxState): AddressFieldsValues {
  return {
    [ADDRESS_LINE_1]: getFieldAddressLine1(state).get(VALUE),
    [ADDRESS_LINE_2]: getFieldAddressLine2(state).get(VALUE),
    [COUNTRY]: getFieldCountry(state).get(VALUE),
    [STATE_US]: getFieldStateUs(state).get(VALUE),
    [STATE_CANADA]: getFieldStateCanada(state).get(VALUE),
    [CITY]: getFieldCity(state).get(VALUE),
    [ZIP]: getFieldZip(state).get(VALUE)
  }
}

export const getCustomAddress = createSelector(
  [ getCartFields ],
  function getCustomAddress ({
    addressLine1,
    addressLine2,
    city,
    country,
    stateUs,
    stateCanada,
    zip
  }: AddressFieldsValues): AddressInfo {
    return {
      addressLine1,
      addressLine2,
      country,
      city,
      state: country === COUNTRY_US
        ? stateUs
        : stateCanada,
      zip
    }
  }
)

export const getCustomAddressAsString = createSelector(
  [ getCartFields ],
  function getCustomAddressAsString ({
    addressLine1,
    addressLine2,
    city,
    country,
    stateUs,
    stateCanada,
    zip
  }: AddressFieldsValues): string {
    return (
      addressLine1 &&
      country &&
      city && (
        stateUs ||
        stateCanada
      ) &&
      zip
    )
      ? getAddress({
        addressLine1,
        addressLine2,
        city,
        country,
        state: country === COUNTRY_US
          ? stateUs
          : stateCanada,
        zip
      })
      : ''
  }
)

// All products
export const getProductsTotalCost = createSelector(
  [
    getCartItems,
    getProductsItems,
    getUserGroups
  ],
  function getProductsTotalCost (cart: TUserCart, products: TProducts, groups: TUserGroups): number {
    if (cart.size === 0 || products.size === 0) {
      return 0.0
    }

    const total = cart.reduce<number>(function reducer (total, versions, productId): number {
      // eslint-disable-next-line perf-standard/check-function-inline
      return total + versions.reduce<number>(function reducer (total, count, versionId): number {
        const product = products.get(productId)

        if (product === undefined) {
          return total
        }

        const version = product.get(VERSIONS).find(function findById (version): boolean {
          return version.get(ID) === versionId
        })

        if (version === undefined) {
          return total
        }

        const discount = getProductVersionDiscountValue(groups, versionId)
        let price = version.get(PRICE)

        if (discount !== 0) {
          price -= price / 100 * discount
        }

        return total + price * count
      }, 0.0)
    }, 0.0)

    return roundToTwo(total)
  }
)

// Only product passing to selector (getProductTotalCost)
function getProductFromProps (_state: ReduxState, product: TProduct): TProduct { return product }

export const getProductTotalCost = createSelector(
  [
    getCartItems,
    getProductsItems,
    getUserGroups,
    getProductFromProps
  ],
  function getProductTotalCost (
    cart: TUserCart,
    products: TProducts,
    groups: TUserGroups,
    product: TProduct
  ): number {
    if (
      cart.size === 0 ||
      products.size === 0 ||
      product === undefined
    ) {
      return 0.0
    }

    const productId = product.get(ID)
    const cartProduct = cart.get(productId)

    if (cartProduct === undefined) {
      return 0.0
    }

    const versions = product.get(VERSIONS)

    const total = cartProduct.reduce<number>(function reducer (total, count, versionId): number {
      const version = versions.find(function findById (version): boolean {
        return version.get(ID) === versionId
      })

      if (version === undefined) {
        return total
      }

      const discount = getProductVersionDiscountValue(groups, versionId)
      let price = version.get(PRICE)

      if (discount !== 0) {
        price -= price / 100 * discount
      }

      return total + price * count
    }, 0.0)

    return roundToTwo(total)
  }
)

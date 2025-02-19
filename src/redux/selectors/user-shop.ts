import { createSelector } from 'reselect'

import {
  getProductsIds,
  getProductsItems,
  checkIsProductsLoaded
} from './user-products'

import { checkIsCategoriesLoaded } from './user-categories'
import { checkIsCertificatesLoaded } from './user-certificates'
import { checkIsManufacturersLoaded } from './user-manufacturers'

import {
  ReduxState,
  TImmutableSearch,
  TImmutableIds
} from '../../types/common'

import { TProducts } from '../../types/account'

import {
  FIELDS,
  IS_FETCHING,
  USER_SHOP,
  PAST,
  PAGE_SIZE,
  SEARCH,
  VALUE,
  LOADING,
  NAME,
  IS_AUTHORIZED
} from '../selector-consts'

export function getIsFetching (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, USER_SHOP, IS_FETCHING])
}

export function getIsAuthorized (state: ReduxState): boolean {
  return state
    .getIn([FIELDS, USER_SHOP, IS_AUTHORIZED])
}

export const getIsShopLoaded = createSelector(
  [
    checkIsProductsLoaded,
    checkIsCategoriesLoaded,
    checkIsCertificatesLoaded,
    checkIsManufacturersLoaded
  ],
  function getIsShopLoaded (...flags: boolean[]): boolean {
    for (let flag of flags) {
      if (flag === false) {
        return false
      }
    }

    return true
  }
)

export function getProductsPast (state: ReduxState): number {
  return state
    .getIn([FIELDS, USER_SHOP, PAST])
}

export function getProductsPageSize (state: ReduxState): number {
  return state
    .getIn([FIELDS, USER_SHOP, PAGE_SIZE])
}

export function getFieldSearch (state: ReduxState): TImmutableSearch {
  return state
    .getIn([FIELDS, USER_SHOP, SEARCH])
}

export function getSearchValue (state: ReduxState): string {
  return getFieldSearch(state)
    .get(VALUE)
}

export function getSearchText (state: ReduxState): string {
  return getFieldSearch(state)
    .get(SEARCH)
}

export function getSearchLoading (state: ReduxState): boolean {
  return getFieldSearch(state)
    .get(LOADING)
}

export const getFilteredProducts = createSelector(
  [
    getSearchValue,
    getProductsIds,
    getProductsItems
  ],
  function getFilteredProducts (
    search: string,
    ids: TImmutableIds,
    items: TProducts
  ): TImmutableIds {
    if (search.length === 0) {
      return ids
    }

    search = search.trim()
      .toLowerCase()

    return ids.filter(function filter (id): boolean {
      const item = items.get(id)

      return item !== undefined &&
        item.get(NAME)
          .toLowerCase()
          .includes(search)
    })
  }
)

import { print } from 'graphql'

import { getEndpoint } from '../../aws/amplify'

import {
  getProductFileUrl,
  getProductImageUrl
} from '../../aws/s3'

import { graphqlRequest } from './common'

import { getIsShopLoaded } from '../selectors/user-shop'

import {
  fetchSuccess,
  setIn,
  changeInput,
  paginationToBegin
} from './fields'

import gqlUser from '../../graphql/user.gql'

import {
  GetState,
  Dispatch,
  FieldsAction,
  DebouncedFieldAction
} from '../../types/common'

import {
  IncProduct,
  IncCategory,
  IncManufacturer,
  IncCertificate,
  IncWarehouse,
  IncSiteDocument
} from '../../types/network'

import {
  USER_SHOP,
  USER_MANUFACTURERS,
  USER_CERTIFICATES,
  USER_DOWNLOADS,
  USER_WAREHOUSES,
  USER_PRODUCTS,
  SEARCH,
  USER_CATEGORIES
} from '../selector-consts'

const ENDPOINT = getEndpoint('user')

const path = [USER_SHOP]

function debouncedSearch (value: string): DebouncedFieldAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const thunk = function thunk (dispatch: Dispatch): any {
    dispatch(
      paginationToBegin({
        path
      })
    )

    dispatch(
      setIn({
        path: [...path, SEARCH],
        loading: false,
        search: value,
      })
    )
  }

  thunk.meta = {
    debounce: {
      key: 'shop:search',
      time: 1000,
      leading: false,
      trailing: true
    }
  }

  return thunk
}

export function shopProductSearch (value: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      setIn({
        path: [...path, SEARCH],
        loading: true,
        value
      })
    )

    dispatch(
      debouncedSearch(value)
    )
  }
}

export function shopManufacturerSearch (value: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    const path = [USER_MANUFACTURERS]

    dispatch(
      changeInput({
        path: [...path, SEARCH],
        value
      })
    )

    dispatch(
      paginationToBegin({
        path
      })
    )
  }
}

interface ResultGetShop {
  isAuthorized?: boolean;
  categories: CategoryItem[];
  products: IncProduct[];
  manufacturers: IncManufacturer[];
  certificates: IncCertificate[];
  warehouses: IncWarehouse[];
  catalog: IncSiteDocument[];
  documents: IncSiteDocument[];
}

export interface StringsMap {
  [key: string]: string;
}

export interface ProductsMap {
  [key: string]: IncProduct;
}

export type CategoryItem = IncCategory & {
  parentSlug?: string;
  children?: string[];
  expanded?: boolean;
}

export interface CategoriesMap {
  [key: string]: CategoryItem;
}

export interface ManufacturersMap {
  [key: string]: IncManufacturer;
}

export interface CertificatesMap {
  [key: string]: IncCertificate;
}

export interface WarehousesMap {
  [key: string]: IncWarehouse;
}

function processResult ({
  isAuthorized,
  categories,
  products,
  manufacturers,
  certificates,
  warehouses = [],
  catalog,
  documents
}: ResultGetShop): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    // Products
    const productItems = products
      // eslint-disable-next-line perf-standard/check-function-inline
      .reduce<ProductsMap>(function reducer (acc, item): ProductsMap {
        for (const version of item.versions) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          version.price = parseFloat(version.price as any)
        }

        for (const image of item.images) {
          image.src = getProductImageUrl(image.src)

          for (const params of image.breakpoints) {
            params.path = getProductImageUrl(params.path)
          }
        }

        for (const file of item.files) {
          file.src = getProductFileUrl(file.src)
        }

        acc[item.id] = item
        return acc
      }, {})

    dispatch(
      fetchSuccess({
        path: [USER_PRODUCTS],
        ids: products
          .map(function mapper ({ id }): string { return id }),

        slugs: products
          .reduce<StringsMap>(function reducer (acc, item): StringsMap {
            acc[item.slug] = item.id
            return acc
          }, {}),

        items: productItems
      })
    )

    // Fill subcategories
    const subcategories: IncCategory[] = []
    const catAssoc: CategoriesMap = {}

    for (const item of categories) {
      catAssoc[item.id] = item

      if (item.parentId !== 'none') {
        const parent = catAssoc[item.parentId]

        if (parent !== undefined) {
          if (parent.children !== undefined) {
            parent.children.push(item.id)
          }

          item.parentSlug = parent.slug
          subcategories.push(item)
        }
      } else {
        item.children = []
      }

      // Remove private products
      item.products = item.products
        .filter(function filter (id): boolean {
          return productItems[id] !== undefined
        })
    }

    // Collect map of slug => id
    const categoriesSlugs = categories
      .reduce<StringsMap>(function reducer (acc, item): StringsMap {
        acc[item.slug] = item.id
        return acc
      }, {})

    // Collect map of items
    const categoriesItems = categories
      .reduce<CategoriesMap>(function reducer (acc, item): CategoriesMap {
        item.expanded = false
        acc[item.id] = item
        return acc
      }, {})

    // Categories
    dispatch(
      fetchSuccess({
        path: [USER_CATEGORIES],
        ids: categories
          .filter(function filter (item): boolean {
            return item.parentId === 'none'
          })
          .map(function mapper (item): string {
            return item.id
          }),
        slugs: categoriesSlugs,
        items: categoriesItems
      })
    )

    // Manufacturers
    dispatch(
      fetchSuccess({
        path: [USER_MANUFACTURERS],
        ids: manufacturers
          .map(function mapper ({ id }): string {
            return id
          }),

        slugs: manufacturers
          .reduce<StringsMap>(function reducer (acc, item): StringsMap {
            acc[item.slug] = item.id
            return acc
          }, {}),

        items: manufacturers
          .reduce<ManufacturersMap>(function reducer (acc, item): ManufacturersMap {
            acc[item.id] = item
            return acc
          }, {})
      })
    )

    // Certificates
    dispatch(
      fetchSuccess({
        path: [USER_CERTIFICATES],
        ids: certificates
          .map(function mapper ({ id }): string {
            return id
          }),

        slugs: certificates
          .reduce<StringsMap>(function reducer (acc, item): StringsMap {
            acc[item.slug] = item.id
            return acc
          }, {}),

        items: certificates
          .reduce<CertificatesMap>(function reducer (acc, item): CertificatesMap {
            acc[item.id] = item
            return acc
          }, {})
      })
    )

    // Warehouses
    dispatch(
      fetchSuccess({
        path: [USER_WAREHOUSES],
        ids: warehouses
          .map(function mapper ({ id }): string {
            return id
          }),

        items: warehouses
          .reduce<WarehousesMap>(function reducer (acc, item): WarehousesMap {
            acc[item.id] = item
            return acc
          }, {})
      })
    )

    // Downloads
    dispatch(
      fetchSuccess({
        path: [USER_DOWNLOADS],
        catalog,
        documents
      })
    )

    dispatch(
      fetchSuccess({
        path,
        isAuthorized
      })
    )
  }
}

export function getHome (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getHome',
        url: `${ENDPOINT}/graphql-incognito`,
        query: print(gqlUser.getHome)
      })
    )
      .then(function result (result: ResultGetShop): void {
        dispatch(
          processResult(result)
        )
      })
  }
}

export function loadHome (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    if (!getIsShopLoaded(getState())) {
      dispatch(
        getHome()
      )
    }
  }
}

export function getShop (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getShop',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.getShop)
      })
    )
      .then(function result (result: ResultGetShop): void {
        dispatch(
          processResult(result)
        )
      })
  }
}

export function loadShop (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    if (!getIsShopLoaded(getState())) {
      dispatch(
        getShop()
      )
    }
  }
}

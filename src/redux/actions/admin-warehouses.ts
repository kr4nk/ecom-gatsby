import { print } from 'graphql'

import { getEndpoint } from '../../aws/amplify'

import { graphqlRequest } from './common'

import { fetchSuccess, fetchComplete } from './fields'

import {
  getLastKey,
  getIsFetching,
  getWarehousesList,
  getWarehousesPageSize
} from '../selectors/admin-warehouses'

import gqlAdmin from '../../graphql/admin.gql'

import {
  Dispatch,
  FieldsAction,
  GetState
} from '../../types/common'

import { IncWarehouse } from '../../types/network'

import { ADMIN_WAREHOUSES } from '../selector-consts'

const ENDPOINT = getEndpoint('admin')

const path = [ADMIN_WAREHOUSES]

export function getAdminWarehousesCount (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getAdminWarehousesCount',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.getWarehousesCount)
      })
    )
      .then(function result ({ getWarehousesCount }: { getWarehousesCount: number }): void {
        dispatch(
          fetchComplete({
            total: getWarehousesCount,
            path
          })
        )
      })
  }
}

export function getAdminWarehouses (isNext?: boolean): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()

    dispatch(
      graphqlRequest({
        path,
        debugName: 'getAdminWarehouses',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.listWarehouses),
        variables: {
          nextToken: isNext ? getLastKey(state) : undefined,
          limit: getWarehousesPageSize(state)
        }
      })
    )
      .then(function result ({ listWarehouses }: { listWarehouses: IncWarehouse[] }): void {
        dispatch(
          fetchSuccess({
            continues: Boolean(isNext),
            list: listWarehouses,
            path
          })
        )
      })
  }
}

export function loadAdminWarehouses (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const state = getState()
    if (
      getIsFetching(state) === false &&
      getWarehousesList(state).size === 0
    ) {
      dispatch(getAdminWarehousesCount())
      dispatch(getAdminWarehouses())
    }
  }
}

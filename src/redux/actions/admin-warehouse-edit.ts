import { print } from 'graphql'
import { event } from 'react-ga'
import { navigate } from '@reach/router'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'
import { getFieldsValues } from '../../utils/fields'

import { fetchSuccess, fetchComplete } from './fields'
import { graphqlRequest } from './common'
import { validateFields } from './validation'

import { getWarehouseFields } from '../selectors/admin-warehouse-edit'

import gqlAdmin from '../../graphql/admin.gql'

import {
  GetState,
  Dispatch,
  FieldsAction
} from '../../types/common'

import { IncWarehouse } from '../../types/network'

import { ADMIN_WAREHOUSE_EDIT } from '../selector-consts'

const ENDPOINT = getEndpoint('admin')

const path = [ADMIN_WAREHOUSE_EDIT]

// eslint-disable-next-line perf-standard/check-function-inline
export function getWarehouseById (warehouseId: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getWarehouseById',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.getWarehouse),
        variables: {
          id: warehouseId
        }
      })
    )
      .then(function result ({ getWarehouse }: { getWarehouse: IncWarehouse }): void {
        dispatch(
          fetchSuccess({
            item: getWarehouse,
            path
          })
        )
      })
  }
}

export function updateWarehouse (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const fields = getWarehouseFields(getState())

    if (!validateFields(fields, dispatch)) {
      return toaster.showError('Not all fields are filled in correctly.')
    }

    const input = getFieldsValues(fields)

    dispatch(
      graphqlRequest({
        path,
        debugName: 'updateWarehouse',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.updateWarehouse),
        variables: { input }
      })
    )
      .then(async function result ({ updateWarehouse }: { updateWarehouse: IncWarehouse }): Promise<void> {
        await navigate(`/admin/warehouse/${updateWarehouse.slug}`, { replace: true })

        event({
          category: 'Admin',
          action: 'Update Warehouse',
          label: updateWarehouse.slug
        })

        toaster.showSuccess('Warehouse has been updated.')

        dispatch(
          fetchComplete({
            path
          })
        )
      })
  }
}

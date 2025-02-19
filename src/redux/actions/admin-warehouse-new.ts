import { print } from 'graphql'
import { event } from 'react-ga'
import { navigate } from '@reach/router'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'
import { getFieldsValues } from '../../utils/fields'

import { fetchSuccess } from './fields'
import { graphqlRequest } from './common'
import { validateFields } from './validation'

import { getWarehouseFields } from '../selectors/admin-warehouse-new'

import gqlAdmin from '../../graphql/admin.gql'

import {
  GetState,
  Dispatch,
  FieldsAction
} from '../../types/common'

import { IncWarehouse } from '../../types/network'

import { ADMIN_WAREHOUSE_NEW } from '../selector-consts'

const ENDPOINT = getEndpoint('admin')

const path = [ADMIN_WAREHOUSE_NEW]

export function createWarehouse (): FieldsAction {
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
        debugName: 'createWarehouse',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.createWarehouse),
        variables: { input }
      })
    )
      .then(async function result ({ createWarehouse }: { createWarehouse: IncWarehouse }): Promise<void> {
        await navigate(`/admin/warehouse/${createWarehouse.slug}`, { replace: true })

        event({
          category: 'Admin',
          action: 'Create Warehouse',
          label: createWarehouse.slug
        })

        toaster.showSuccess('Warehouse has been created.')

        dispatch(
          fetchSuccess({
            path
          })
        )
      })
  }
}

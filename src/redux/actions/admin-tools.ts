import { print } from 'graphql'
import { event, exception } from 'react-ga'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'

import { graphqlRequest } from './common'

import { fetchSuccess } from './fields'

import gqlAdmin from '../../graphql/admin.gql'

import {
  Dispatch,
  FieldsAction
} from '../../types/common'

import { ADMIN_TOOLS } from '../selector-consts'

const ENDPOINT = getEndpoint('admin')

const path = [ADMIN_TOOLS]

export function rebuildSite (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'rebuildSite',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.netlifyDeploy)
      })
    )
      .then(function success (): void {
        event({
          category: 'Admin',
          action: 'Start Rebuilding Site'
        })

        toaster.showSuccess('Rebuilding site successfully started. Please wait 10 minutes.')

        dispatch(
          fetchSuccess({
            path
          })
        )
      })
  }
}

export function databaseFill (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'databaseFill',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.databaseFill)
      })
    )
      .then(function success (result): void {
        if (result.success) {
          toaster.showSuccess('Data successfully loaded to database.')

          event({
            category: 'Admin',
            action: 'Fill Database'
          })
        } else {
          const error = result.error || result.errorMessage

          toaster.showError(error)

          exception({
            description: `[Admin Fill Database] ${error}`,
            fatal: true
          })
        }

        dispatch(
          fetchSuccess({
            path
          })
        )
      })
  }
}

export function databaseFillWarehouses (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'databaseFillWarehouses',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.databaseFillWarehouses)
      })
    )
      .then(function success (result): void {
        if (result.success) {
          toaster.showSuccess('Warehouse data successfully updated in database.')

          event({
            category: 'Admin',
            action: 'Fill Warehouses'
          })
        } else {
          const error = result.error || result.errorMessage

          toaster.showError(error)

          exception({
            description: `[Admin Fill Warehouses] ${error}`,
            fatal: true
          })
        }

        dispatch(
          fetchSuccess({
            path
          })
        )
      })
  }
}

export function databaseClearOrders (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'databaseClearOrders',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.databaseClearOrders)
      })
    )
      .then(function success (result): void {
        if (result.success) {
          toaster.showSuccess('All orders have been deleted from the database.')

          event({
            category: 'Admin',
            action: 'Clear Orders'
          })
        } else {
          const error = result.error || result.errorMessage

          toaster.showError(error)

          exception({
            description: `[Admin Clear Orders] ${error}`,
            fatal: true
          })
        }

        dispatch(
          fetchSuccess({
            path
          })
        )
      })
  }
}

export function databaseClear (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'databaseClear',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.databaseClear)
      })
    )
      .then(function success (result): void {
        if (result.success) {
          toaster.showSuccess('The database was successfully cleared.')

          event({
            category: 'Admin',
            action: 'Clear Database'
          })
        } else {
          const error = result.error || result.errorMessage

          toaster.showError(error)

          exception({
            description: `[Admin Clear Database] ${error}`,
            fatal: true
          })
        }

        dispatch(
          fetchSuccess({
            path
          })
        )
      })
  }
}

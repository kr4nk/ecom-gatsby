import { print } from 'graphql'
import { event } from 'react-ga'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'
import { getFieldsValues } from '../../utils/fields'

import { graphqlRequest } from './common'

import { fetchSuccess } from './fields'

import { validateFields } from './validation'

import {
  getUserId,
  getUserFields
} from '../selectors/admin-user-edit'

import gqlAdmin from '../../graphql/admin.gql'

import {
  GetState,
  Dispatch,
  FieldsAction
} from '../../types/common'

import { IncUser } from '../../types/network'

import { ADMIN_USER_EDIT } from '../selector-consts'

const ENDPOINT = getEndpoint('admin')

const path = [ADMIN_USER_EDIT]

export function editUserById (userId: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getUser',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.getUser),
        variables: {
          id: userId
        }
      })
    )
      .then(function result ({ getUser }: { getUser: IncUser }): void {
        dispatch(
          fetchSuccess({
            item: getUser,
            path
          })
        )
      })
  }
}

export function updateUser (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const fields = getUserFields(getState())

    if (!validateFields(fields, dispatch)) {
      return toaster.showError('Not all fields are filled in correctly.')
    }

    const input = getFieldsValues(fields)
    input.id = getUserId(getState())

    dispatch(
      graphqlRequest({
        path,
        debugName: 'updateUser',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.updateUser),
        variables: { input }
      })
    )
      .then(function result ({ updateUser }: { updateUser: IncUser }): void {
        event({
          category: 'Admin',
          action: 'Update User',
          label: updateUser.id
        })

        toaster.showSuccess('User has been updated.')

        dispatch(
          fetchSuccess({
            path,
            item: updateUser
          })
        )
      })
  }
}

import { print } from 'graphql'
import { event } from 'react-ga'
import { navigate } from '@reach/router'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'
import { getFieldsValues } from '../../utils/fields'

import { fetchSuccess } from './fields'
import { graphqlRequest } from './common'
import { validateFields } from './validation'

import { getUserFields } from '../selectors/admin-user-new'

import gqlAdmin from '../../graphql/admin.gql'

import {
  GetState,
  Dispatch,
  FieldsAction
} from '../../types/common'

import { IncUser } from '../../types/network'

import { ADMIN_USER_NEW } from '../selector-consts'

const ENDPOINT = getEndpoint('admin')

const path = [ADMIN_USER_NEW]

export function createUser (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const fields = getUserFields(getState())

    if (!validateFields(fields, dispatch)) {
      return toaster.showError('Not all fields are filled in correctly.')
    }

    const input = getFieldsValues(fields)

    dispatch(
      graphqlRequest({
        path,
        debugName: 'createUser',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.createUser),
        variables: { input }
      })
    )
      .then(async function result ({ createUser }: { createUser: IncUser }): Promise<void> {
        await navigate(`/admin/user/${createUser.id}`, { replace: true })

        event({
          category: 'Admin',
          action: 'Create User',
          label: createUser.id
        })

        toaster.showSuccess('User has been created.')

        dispatch(
          fetchSuccess({
            path
          })
        )
      })
  }
}

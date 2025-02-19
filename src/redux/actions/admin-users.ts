import { print } from 'graphql'

import { getEndpoint } from '../../aws/amplify'

import { graphqlRequest } from './common'

import { fetchSuccess } from './fields'

import gqlAdmin from '../../graphql/admin.gql'

import {
  Dispatch,
  FieldsAction
} from '../../types/common'

import { IncUserShort } from '../../types/network'

import { ADMIN_USERS } from '../selector-consts'

const ENDPOINT = getEndpoint('admin')

const path = [ADMIN_USERS]

export function getAdminUsers (direction?: string, lastKey?: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getUsers',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlAdmin.listUsers),
        variables: {
          direction,
          nextToken: lastKey
        }
      })
    )
      .then(function success ({ listUsers }: { listUsers: IncUserShort[] }): void {
        dispatch(
          fetchSuccess({
            direction: direction !== 'backward' ? 1 : -1,
            continues: lastKey !== undefined,
            list: listUsers,
            path
          })
        )
      })
  }
}

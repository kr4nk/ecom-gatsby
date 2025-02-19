import { print } from 'graphql'

import { getEndpoint } from '../../aws/amplify'

import { graphqlRequest } from './common'

import { fetchSuccess } from './fields'

import gqlUser from '../../graphql/user.gql'

import {
  Dispatch,
  FieldsAction
} from '../../types/common'

import { IncOrderShort } from '../../types/network'

import { USER_ORDERS } from '../selector-consts'

const ENDPOINT = getEndpoint('user')

const path = [USER_ORDERS]

export function getOrders (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        debugName: 'getOrders',
        url: `${ENDPOINT}/graphql`,
        query: print(gqlUser.listOrders)
      })
    )
      .then(function result ({ listOrders }: { listOrders: IncOrderShort[] }): void {
        dispatch(
          fetchSuccess({
            path,
            orders: listOrders
          })
        )
      })
  }
}

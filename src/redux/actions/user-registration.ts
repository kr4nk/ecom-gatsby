import { print } from 'graphql'
import { event } from 'react-ga'
import { navigate } from '@reach/router'

import { getEndpoint } from '../../aws/amplify'

import toast from '../../utils/toast'
import { isBrowser } from '../../utils/isbrowser'
import { getFieldsValues } from '../../utils/fields'

import { graphqlRequest } from './common'

import { fetchSuccess } from './fields'

import { validateFields } from './validation'

import { getRegistrationFields } from '../selectors/user-registration'

import gqlUser from '../../graphql/user.gql'

import {
  GetState,
  Dispatch,
  FieldsAction
} from '../../types/common'

import { IncUser } from '../../types/network'

import { USER_REGISTRATION, VALUE } from '../selector-consts'

const ENDPOINT = getEndpoint('user')

const path = [USER_REGISTRATION]

export function submitRegistration (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    if (isBrowser) {
      const fields = getRegistrationFields(getState())

      if (!validateFields(fields, dispatch)) {
        return toast.showError('Not all fields are filled in correctly.')
      }

      const input = getFieldsValues(fields)

      // @ts-ignore Property 'state' does not exist on type '{}'.ts(2339)
      input.state = fields.state.get(VALUE)

      dispatch(
        graphqlRequest({
          path,
          url: `${ENDPOINT}/graphql`,
          debugName: 'submitRegistration',
          query: print(gqlUser.createUser),
          variables: { input }
        })
      )
        .then(async function result ({ createUser }: { createUser: IncUser }): Promise<void> {
          event({
            category: 'User',
            action: 'Submit Registration Form'
          })

          await navigate('/account/pending', { replace: true })

          dispatch(
            fetchSuccess({
              path,
              result: createUser
            })
          )
        })
    }
  }
}

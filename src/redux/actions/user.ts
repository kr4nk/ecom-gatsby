import { print } from 'graphql'
import { navigate } from '@reach/router'
import { event, exception } from 'react-ga'
import Auth from '@aws-amplify/auth'

import {
  getEndpoint,
  CognitoError
} from '../../aws/amplify'

import toaster from '../../utils/toast'
import { isBrowser } from '../../utils/isbrowser'
import { getErrorMessage } from '../../utils/error'

import { graphqlRequest } from './common'

import {
  ROLE_GUEST,
  ROLE_PENDING,
  ROLE_ADMIN,
  ROLE_MANAGER
} from '../../const/roles'

import { LOGOUT } from '../action-types'

import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  fetchComplete
} from './fields'

import gqlUser from '../../graphql/user.gql'

import {
  Dispatch,
  FieldsAction
} from '../../types/common'

import {
  IncCart,
  IncUser,
  IncUserGroup
} from '../../types/network'

import {
  USER,
  USER_CART,
  USER_PROFILE
} from '../selector-consts'

const ENDPOINT = getEndpoint('user')

const path = [USER]

export function logOut (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch): any {
    if (isBrowser) {
      return Auth.signOut()
        .then(async function result (): Promise<void> {
          await navigate('/signin')

          dispatch({
            type: LOGOUT
          })

          event({
            category: 'User',
            action: 'LogOut'
          })

          window.location.reload()
        })
        .catch(function error (err: CognitoError): void {
          const error = err.message

          exception({
            description: `[User Logout] ${error}`,
            fatal: true
          })

          toaster.showError(`Network Error: ${error}`)
        })
    }
  }
}

export function checkAuth (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    if (isBrowser) {
      return Auth.currentSession()
        .then(function success (): void {
          dispatch(
            fetchRequest({ path })
          )
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          return getUserData(dispatch)
        })
        .catch(function error (): void {})
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getUserData (dispatch: Dispatch, pathname?: string): any {
  dispatch(
    graphqlRequest({
      debugName: 'getUserData',
      url: `${ENDPOINT}/graphql`,
      query: print(gqlUser.getUserData)
    })
  )
    .then(function result ({ user, cart, groups }: { user: IncUser; cart: IncCart; groups: IncUserGroup[] }): Promise<void> {
      dispatch(
        fetchSuccess({
          path: [USER_CART],
          cart
        })
      )

      dispatch(
        fetchSuccess({
          path: [USER_PROFILE],
          user
        })
      )

      return Promise.resolve({ user, pathname })
        .then(function redirect ({ user, pathname }: { user: IncUser; pathname?: string }): void {
          switch (user.role) {
            case ROLE_ADMIN:
              return navigate(
                pathname !== undefined
                  ? pathname
                  : '/admin'
              )

            case ROLE_MANAGER:
              return navigate(
                pathname !== undefined
                  ? pathname
                  : '/manager'
              )

            case ROLE_PENDING:
              return navigate('/account/pending')

            case ROLE_GUEST:
              return navigate('/account/downloads')

            default:
              break
          }

          if (!user.isVerified) {
            return navigate('/account/registration')
          }

          return navigate(
            pathname !== undefined
              ? pathname
              : '/account'
          )
        })
        .then(function success (): void {
          dispatch(
            fetchSuccess({
              path,
              user,
              groups
            })
          )
        })
    })
    .catch(function error (err: Error | string): void {
      const errorMessage = getErrorMessage(err)

      exception({
        description: `[User Get User Data] ${errorMessage}`,
        fatal: true
      })

      toaster.showError(errorMessage)

      dispatch(
        fetchFailure({
          path,
          errorMessage
        })
      )
    })
}

export function getUser (pathname?: string): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    if (isBrowser) {
      dispatch(
        fetchRequest({ path })
      )

      return Auth.currentAuthenticatedUser()
        .then(function result (): void {
          return getUserData(
            dispatch,
            pathname
          )
        })
        .catch(function error (err: CognitoError | string): void {
          let errorMessage = typeof err === 'object'
            ? err.message
            : err

          if (err === 'not authenticated') {
            errorMessage = ''
          }

          if (errorMessage) {
            exception({
              description: `[User Get User] ${errorMessage}`,
              fatal: true
            })

            toaster.showError(`Authentication Error: ${errorMessage}`)

            dispatch(
              fetchFailure({
                path,
                errorMessage
              })
            )
          } else {
            dispatch(
              fetchComplete({ path })
            )
          }
        })
    }
  }
}

// eslint-disable-next-line perf-standard/check-function-inline
export function confirmAction (password: string, callback: (err?: CognitoError) => void): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (): any {
    return Auth.currentAuthenticatedUser()
      .then(function confirm (user): Promise<'SUCCESS'> {
        return Auth.changePassword(user, password, password)
      })
      .then(function success (/*_data*/): void {
        event({
          category: 'Danger Action',
          action: 'Success'
        })

        callback()
      })
      .catch(function error (err: CognitoError): void {
        exception({
          description: `[Danger action] ${err.message}`,
          fatal: false
        })

        callback(err)
      })
  }
}

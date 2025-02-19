import { print, DocumentNode } from 'graphql'
import { exception } from 'react-ga'
import Auth from '@aws-amplify/auth'

import { getEndpoint } from '../../aws/amplify'

import toast from '../../utils/toast'

import { isBrowser } from '../../utils/isbrowser'

import {
  getErrorMessage,
  getServerError
} from '../../utils/error'

import {
  fetchRequest,
  fetchSuccess,
  fetchFailure,
  validateInput,
  validateInputByFlag
} from './fields'

import {
  GetState,
  Dispatch,
  FieldsAction,
  ReduxState,
  DebouncedFieldAction,
  TImmutablePaths
} from '../../types/common'

const ENDPOINT_VALIDATE_PHONE = getEndpoint('validate-phone')
const ENDPOINT_MANAGER = getEndpoint('manager')

export function debouncedValidatePhone (
  path: TImmutablePaths | string[],
  value: string,
  required: boolean = true
): DebouncedFieldAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const thunk = async function thunk (dispatch: Dispatch): Promise<any> {
    if (isBrowser) {
      let errorMessage = 'Invalid phone number'
      let isValid = false

      if (value.length > 10) {
        try {
          const jwtToken = (await Auth.currentSession())
            .getIdToken().getJwtToken()

          const { success } = await fetch(`${ENDPOINT_VALIDATE_PHONE}?phone=${encodeURIComponent(value)}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              Accept: 'application/json',
              Authorization: jwtToken
            }
          })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then(function asJSON (request): Promise<any> {
              return request.json()
            })

          isValid = success

          if (isValid) {
            errorMessage = ''
          }
        } catch (err) {
          errorMessage = getErrorMessage(err)
          isValid = false

          exception({
            description: `[VALIDATE PHONE ${path.join('/')}] ${errorMessage}`,
            fatal: true
          })
        }
      }

      dispatch(
        validateInputByFlag({
          path,
          value,
          isValid,
          required,
          errorMessage,
          isFetching: false
        })
      )
    }
  }

  thunk.meta = {
    debounce: {
      key: `phone:${path.join('/')}`,
      time: 1000,
      leading: false,
      trailing: true
    }
  }

  return thunk
}

interface Headers {
  [key: string]: string;
}

interface ApiRequestOptions {
  url: string;
  path: TImmutablePaths | string[];
  method?: string;
  headers?: Headers;
  debugName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBody?(getState: () => ReduxState): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?(result: any, dispatch: Dispatch): void;
  onFailure?(error: string, dispatch: Dispatch): void;
}

// With authorization
export function apiRequest ({
  url,
  path,
  method = 'GET',
  headers = {},
  getBody,
  debugName,
  onSuccess,
  onFailure
}: ApiRequestOptions): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async function thunk (dispatch: Dispatch, getState: GetState): Promise<any> {
    if (isBrowser) {
      dispatch(
        fetchRequest({
          path
        })
      )

      let errorMessage

      try {
        const jwtToken = (await Auth.currentSession())
          .getIdToken().getJwtToken()

        const body = getBody instanceof Function && getBody(getState)

        const result = await fetch(url, {
          method,
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            ...headers,
            Authorization: jwtToken
          },
          body
        })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then(function asJSON (request): Promise<any> {
            return request.json()
          })

        if (debugName) {
          // console.info(debugName, 'result:', result)
        }

        if (result.success) {
          onSuccess instanceof Function
            ? onSuccess(result, dispatch)
            : dispatch(
              fetchSuccess({
                path,
                ...result
              })
            )
        } else {
          errorMessage = getServerError(result)
        }
      } catch (err) {
        if (debugName) {
          console.error(debugName, 'error:', err)
        }

        errorMessage = getErrorMessage(err)
      }

      if (errorMessage) {
        toast.showError(errorMessage)

        onFailure instanceof Function
          ? onFailure(errorMessage, dispatch)
          : dispatch(
            fetchFailure({
              path,
              errorMessage: `Network Error: ${errorMessage}`
            })
          )

        exception({
          description: `[API REQUEST ${debugName}] ${errorMessage}`,
          fatal: true
        })
      }
    }
  }
}

// Unauthorized
export function apiUnauthorizedRequest ({
  url,
  path,
  method = 'GET',
  headers = {},
  getBody,
  debugName,
  onSuccess,
  onFailure
}: ApiRequestOptions): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async function thunk (dispatch: Dispatch, getState: GetState): Promise<any> {
    dispatch(
      fetchRequest({
        path
      })
    )

    let errorMessage

    try {
      const body = getBody instanceof Function && getBody(getState)

      const result = await fetch(url, {
        method,
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          ...headers
        },
        body
      })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then(function asJSON (request): Promise<any> {
          return request.json()
        })

      if (debugName) {
        console.info(debugName, 'result:', result)
      }

      if (result.success) {
        onSuccess instanceof Function
          ? onSuccess(result, dispatch)
          : dispatch(
            fetchSuccess({
              path,
              ...result
            })
          )
      } else {
        errorMessage = getServerError(result)
      }
    } catch (err) {
      if (debugName) {
        console.error(debugName, 'error:', err)
      }

      errorMessage = getErrorMessage(err)
    }

    if (errorMessage) {
      toast.showError(errorMessage)

      onFailure instanceof Function
        ? onFailure(errorMessage, dispatch)
        : dispatch(
          fetchFailure({
            path,
            errorMessage: `Network Error: ${errorMessage}`
          })
        )

      exception({
        description: `[API UNAUTH REQUEST ${debugName}] ${errorMessage}`,
        fatal: true
      })
    }
  }
}

interface GraphqlRequestOptions {
  url: string;
  path?: TImmutablePaths | string[];
  debugName?: string;
  headers?: Headers;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBody?(getState: () => ReduxState): any;
  query?: string;
  variables?: object;
}

// GraphQl request
export function graphqlRequest ({
  url,
  path,
  headers = {},
  getBody,
  query,
  variables,
  debugName
}: GraphqlRequestOptions): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): Promise<any> {
    if (!isBrowser) {
      return Promise.reject(
        new Error('document is undefined')
      )
    }

    return new Promise(async function executor (resolve, reject): Promise<void> {
      if (path) {
        dispatch(
          fetchRequest({
            path
          })
        )
      }

      let errorMessage

      try {
        const jwtToken = (await Auth.currentSession())
          .getIdToken().getJwtToken()

        const body = getBody instanceof Function
          ? getBody(getState)
          : JSON.stringify({ query, variables })

        if (!(body instanceof FormData)) {
          headers['Content-Type'] = 'application/json'
        }

        const result = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            ...headers,
            Authorization: jwtToken
          },
          body
        })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then(function asJSON (request): Promise<any> {
            return request.json()
          })

        if (debugName !== undefined) {
          console.info(debugName, 'result:', result)
        }

        if (result.errors) {
          errorMessage = getServerError(result)
        } else {
          resolve(result.data)
        }
      } catch (err) {
        if (debugName !== undefined) {
          console.error(debugName, 'error:', err)
        }

        errorMessage = getErrorMessage(err)
      }

      if (errorMessage !== undefined) {
        toast.showError(errorMessage)

        exception({
          description: `[GraphQL Request ${debugName}] ${errorMessage}`,
          fatal: true
        })

        reject(errorMessage)
      }
    })
      .catch(function catchError (msg: string): void {
        dispatch(
          fetchFailure({
            path,
            errorMessage: `Network Error: ${msg}`
          })
        )

        throw msg
      })
  }
}

interface CheckValueForUniqueOptions {
  itemId?: string;
  value: string;
  path: TImmutablePaths;
  query: DocumentNode;
  errorText: string;
}

export function checkValueForUnique ({
  itemId,
  value,
  path,
  query,
  errorText
}: CheckValueForUniqueOptions): DebouncedFieldAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const thunk = function thunk (dispatch: Dispatch): any {
    if (value === '') {
      dispatch(
        validateInput({
          path,
          value,
          isFetching: false,
          errorMessage: ''
        })
      )
      return
    }

    dispatch(
      graphqlRequest({
        // path,
        debugName: 'checkValueForUnique',
        url: `${ENDPOINT_MANAGER}/graphql`,
        query: print(query),
        variables: { value }
      })
    )
      .then(function validateId ({ id }: { id: string }): void {
        const isValid = id === '' || itemId === id
        const errorMessage = isValid ? '' : errorText

        dispatch(
          validateInputByFlag({
            path,
            value,
            isValid,
            isFetching: false,
            errorMessage
          })
        )
      })
      .catch(function catchError (err): void {
        exception({
          description: `[CHECK UNIQUE VALUE ${path.join('/')}] ${err}`,
          fatal: true
        })

        dispatch(
          validateInputByFlag({
            path,
            value,
            isValid: false,
            isFetching: false,
            errorMessage: err
          })
        )
      })
  }

  thunk.meta = {
    debounce: {
      key: `slug:${path.join('/')}`,
      time: 3000,
      leading: false,
      trailing: true
    }
  }

  return thunk
}

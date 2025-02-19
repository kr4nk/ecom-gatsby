import { print } from 'graphql'
import { event, exception } from 'react-ga'
import Auth from '@aws-amplify/auth'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'
import { isBrowser } from '../../utils/isbrowser'
import { getFieldsValues } from '../../utils/fields'

import { graphqlRequest } from './common'

import { validateFields } from './validation'

import {
  fetchRequest,
  fetchFailure,
  fetchComplete,
  setIn
} from './fields'

import { getUser } from '../selectors/user'
import { getUserFields } from '../selectors/user-profile'

import gqlUser from '../../graphql/user.gql'

import {
  GetState,
  Dispatch,
  FieldsAction
} from '../../types/common'

import {
  IncUser,
  IncSiteDocument
} from '../../types/network'

import {
  USER,
  USER_PROFILE,
  DATA,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  CITY,
  COUNTRY,
  STATE,
  ZIP
} from '../selector-consts'

const ENDPOINT = getEndpoint('user')

const path = [USER_PROFILE]

export function uploadPermit (file: File): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        url: `${ENDPOINT}/graphql`,
        debugName: 'uploadPermit',
        getBody (): FormData {
          const data = new FormData()
          data.append('query', print(gqlUser.updateUser))
          data.append('variables[input][fileResellersPermit]', file)
          return data
        }
      })
    )
      .then(function success ({ name, type, size, src }: IncSiteDocument): void {
        dispatch(
          fetchComplete({
            path,
            data: {
              permit: {
                name,
                type,
                size,
                src
              }
            }
          })
        )

        event({
          category: 'User',
          action: 'Upload Resellers Permit',
          label: name
        })

        toaster.showSuccess('Your resellers permit has been uploaded.')
      })
  }
}

export function getPermit (): FieldsAction {
  return async function thunk (dispatch: Dispatch): Promise<void> {
    dispatch(
      fetchRequest({
        path
      })
    )

    try {
      const jwtToken = (await Auth.currentSession())
        .getIdToken().getJwtToken()

      const fileName = 'resellers-permit.pdf'
      let fileType = ''
      let fileDate = 0

      const result = await fetch(`${ENDPOINT}/resellers-permit`, {
        method: 'GET',
        mode: 'cors',
        // credentials: 'include',
        headers: {
          Authorization: jwtToken
        }
      })
        .then(function success (response): Promise<Blob> {
          fileType = response.headers.get('content-type') || ''
          fileDate = Date.parse(response.headers.get('last-modified') || '')

          return response.blob()
        })

      dispatch(
        fetchComplete({
          path
        })
      )

      const file = new File([result], fileName, {
        lastModified: fileDate,
        type: fileType
      })

      const link = document.createElement('a')
      link.href = URL.createObjectURL(file)
      // link.download = fileName
      link.type = fileType
      // link.target = '_blank'
      link.click()

      event({
        category: 'User',
        action: 'Get Resellers Permit'
      })
    } catch (err) {
      console.error('getPermit:', err)

      exception({
        description: `[User Profile Get Permit] ${err}`,
        fatal: true
      })

      toaster.showError(err)

      dispatch(
        fetchFailure({
          path
        })
      )
    }
  }
}

export function uploadExemption (file: File): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch): any {
    dispatch(
      graphqlRequest({
        path,
        url: `${ENDPOINT}/graphql`,
        debugName: 'uploadExemption',
        getBody (): FormData {
          const data = new FormData()
          data.append('query', print(gqlUser.updateUser))
          data.append('variables[input][fileTaxExemptionForm]', file)
          return data
        }
      })
    )
      .then(function success ({ name, type, size, src }: IncSiteDocument): void {
        dispatch(
          fetchComplete({
            path,
            data: {
              exemption: {
                name,
                type,
                size,
                src
              }
            }
          })
        )

        event({
          category: 'User',
          action: 'Upload Tax Exemption',
          label: name
        })

        toaster.showSuccess('Your tax exemption form has been uploaded.')
      })
  }
}

export function getExemption (): FieldsAction {
  return async function thunk (dispatch: Dispatch): Promise<void> {
    dispatch(
      fetchRequest({
        path
      })
    )

    try {
      const jwtToken = (await Auth.currentSession())
        .getIdToken().getJwtToken()

      const fileName = 'tax-exemption-form.pdf'
      let fileType = ''
      let fileDate = 0

      const result = await fetch(`${ENDPOINT}/tax-exemption-form`, {
        method: 'GET',
        mode: 'cors',
        // credentials: 'include',
        headers: {
          Authorization: jwtToken
        }
      })
        .then(function success (response): Promise<Blob> {
          fileType = response.headers.get('content-type') || ''
          fileDate = Date.parse(response.headers.get('last-modified') || '')

          return response.blob()
        })

      dispatch(
        fetchComplete({
          path
        })
      )

      const file = new File([result], fileName, {
        lastModified: fileDate,
        type: fileType
      })

      const link = document.createElement('a')
      link.href = URL.createObjectURL(file)
      // link.download = fileName
      link.type = fileType
      // link.target = '_blank'
      link.click()

      event({
        category: 'User',
        action: 'Get Tax Exemption Form'
      })
    } catch (err) {
      console.error('getExemption:', err)

      dispatch(
        fetchFailure({
          path
        })
      )

      exception({
        description: `[User Profile Get Exemption] ${err}`,
        fatal: true
      })

      toaster.showError(err)
    }
  }
}

export function saveBillingAddress (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    if (isBrowser) {
      const fields = getUserFields(getState())

      if (!validateFields(fields, dispatch)) {
        return toaster.showError('Not all fields are filled in correctly.')
      }

      const input = getFieldsValues(fields)

      dispatch(
        graphqlRequest({
          path,
          url: `${ENDPOINT}/graphql`,
          debugName: 'saveBillingAddress',
          query: print(gqlUser.updateUser),
          variables: { input }
        })
      )
        .then(function success ({ updateUser: { addressLine1, addressLine2 = '', country, state, city, zip } }: { updateUser: IncUser }): void {
          dispatch(
            setIn({
              path: [USER, DATA],
              addressLine1,
              addressLine2,
              country,
              state,
              city,
              zip
            })
          )

          event({
            category: 'User',
            action: 'Update Address in Profile'
          })

          toaster.showSuccess('Your billing address has been updated.')
        })
    }
  }
}

export function editBillingAddress (): FieldsAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
  return function thunk (dispatch: Dispatch, getState: GetState): any {
    const user = getUser(getState())

    const addressLine1 = user.get(ADDRESS_LINE_1)
    const addressLine2 = user.get(ADDRESS_LINE_2)
    const city = user.get(CITY)
    const country = user.get(COUNTRY)
    const state = user.get(STATE)
    const zip = user.get(ZIP)

    dispatch(
      setIn({
        path: [USER, DATA],
        addressLine1,
        addressLine2,
        city,
        country,
        state,
        zip
      })
    )
  }
}

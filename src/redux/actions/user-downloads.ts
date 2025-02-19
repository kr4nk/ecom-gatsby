import { event, exception } from 'react-ga'
import Auth from '@aws-amplify/auth'

import { getEndpoint } from '../../aws/amplify'

import toaster from '../../utils/toast'

import {
  fetchRequest,
  fetchFailure,
  fetchComplete
} from './fields'

import {
  Dispatch,
  FieldsAction
} from '../../types/common'

import {
  USER_DOWNLOADS
} from '../selector-consts'

const ENDPOINT = getEndpoint('user')

const path = [USER_DOWNLOADS]

interface FileInfo {
  name: string;
  type: string;
  date: number;
  content: Blob;
}

export function getPublicFile (id: string, download: boolean = false): FieldsAction {
  return async function thunk (dispatch: Dispatch): Promise<void> {
    dispatch(
      fetchRequest({
        path
      })
    )

    try {
      const result = await fetch(`${ENDPOINT}/file/public/${id}`, {
        method: 'GET',
        mode: 'cors',
        // credentials: 'include',
      })
        .then(function success (response): Promise<FileInfo> {
          return response.blob()
            .then(function asBlob (content): FileInfo {
              return ({
                name: response.headers.get('x-file-name') || '',
                type: response.headers.get('content-type') || '',
                date: Date.parse(response.headers.get('last-modified') || ''),
                content
              })
            })
        })

      dispatch(
        fetchComplete({
          path
        })
      )

      const file = new File([result.content], result.name, {
        lastModified: result.date,
        type: result.type
      })

      const link = document.createElement('a')
      link.href = URL.createObjectURL(file)
      link.type = result.type

      if (download) {
        link.download = result.name
      }

      link.click()

      event({
        category: 'User',
        action: 'Get Public File',
        label: result.name
      })
    } catch (err) {
      exception({
        description: `[User Downloads Get Public File] ${err}`,
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

export function getProtectedFile (id: string, download = false): FieldsAction {
  return async function thunk (dispatch: Dispatch): Promise<void> {
    dispatch(
      fetchRequest({
        path
      })
    )

    try {
      const jwtToken = (await Auth.currentSession())
        .getIdToken().getJwtToken()

      const result = await fetch(`${ENDPOINT}/file/protected/${id}`, {
        method: 'GET',
        mode: 'cors',
        // credentials: 'include',
        headers: {
          Authorization: jwtToken
        }
      })
        .then(function success (response): Promise<FileInfo> {
          return response.blob()
            .then(function asBlob (content): FileInfo {
              return ({
                name: response.headers.get('x-file-name') || '',
                type: response.headers.get('content-type') || '',
                date: Date.parse(response.headers.get('last-modified') || ''),
                content
              })
            })
        })

      dispatch(
        fetchComplete({
          path
        })
      )

      const file = new File([result.content], result.name, {
        lastModified: result.date,
        type: result.type
      })

      const link = document.createElement('a')
      link.href = URL.createObjectURL(file)
      link.type = result.type

      if (download) {
        link.download = result.name
      }

      link.click()

      event({
        category: 'User',
        action: 'Get Protected File',
        label: result.name
      })
    } catch (err) {
      exception({
        description: `[User Downloads Get Protected File] ${err}`,
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

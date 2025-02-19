/* globals window */
import 'whatwg-fetch'

import * as React from 'react'
import { withPrefix } from 'gatsby'
import { initialize, pageview } from 'react-ga'
import uniqid from 'uniqid'
import { Provider } from 'react-redux'
import Auth from '@aws-amplify/auth'
import { Map as IMap } from 'immutable'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import TagManager from 'react-gtm-module'
import dayjs from 'dayjs'

import LocalizedFormat from 'dayjs/plugin/localizedFormat'

import {
  googleAnalyticsKey,
  gtmId,
  yandexMetrikaKey
} from './src/config'

import { storage } from './src/utils/storage'
import { isBrowser } from './src/utils/isbrowser'
import { fetchInject } from './src/utils/fetch-inject'
import { injectYm, ym } from './src/utils/ym'

import { awsmobile } from './src/aws/exports'
import { combinedReducers } from './src/redux/reducers/index'

import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'

toast.configure()

dayjs.extend(LocalizedFormat)

console.info('process.env.GATSBY_AWS_ENV:', process.env.GATSBY_AWS_ENV)

const composeEnhancers = (
  (process.env.GATSBY_AWS_ENV === 'development' || process.env.GATSBY_AWS_ENV === 'staging') &&
  isBrowser &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

const debounce = createDebounce()

function configureStore (initialState) {
  const store = createStore(
    combinedReducers,
    initialState,
    composeEnhancers(
      applyMiddleware(debounce, thunk)
    )
  )

  return store
}

const store = configureStore(IMap())

if (isBrowser) {
  Auth.configure(awsmobile)
}

export function wrapRootElement ({ element }) {
  const ConnectedRootElement = (
    <Provider store={store}>
      {element}
    </Provider>
  )

  return ConnectedRootElement
}

export function onClientEntry () {
  if (isBrowser) {
    if (!window.Intl) {
      import('intl')
        .then(function success () {
          console.info('Intl loaded')
        })
        .catch(function failure (err) {
          console.error('Intl loading error:', err)
        })
    }

    let userId = storage.getItem('userId')

    if (!userId) {
      userId = uniqid('clientId-')
      storage.setItem('userId', userId)
    }

    fetchInject([withPrefix('/css/fonts.css')])

    if (yandexMetrikaKey !== undefined) {
      injectYm(yandexMetrikaKey)
    }

    initialize(
      googleAnalyticsKey,
      {
        gaOptions: {
          userId
        }
      }
    )

    pageview(window.location.pathname + window.location.search)

    setTimeout(function timeout () {
      TagManager.initialize({
        gtmId,
        dataLayer: {
          userId,
          userProject: 'ecom-gatsby'
        }
      })
    }, 1000)
  }
}

export function onServiceWorkerUpdateFound () {
  if (isBrowser) {
    // const answer = window.confirm(`
    // Please press "OK" for update to the latest version
    // `)

    // if (answer === true) {
    window.location.reload(true)
    // }
  }
}

export function onRouteUpdate ({ location }) {
  if (isBrowser) {
    const url = location.pathname + location.search + location.hash

    Promise.resolve(url)
      .then(function action (url) {
        pageview(url)

        if (yandexMetrikaKey !== undefined) {
          ym(yandexMetrikaKey, 'hit', url)
        }
      })
  }
}

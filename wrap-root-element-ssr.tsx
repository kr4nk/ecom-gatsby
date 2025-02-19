import * as React from 'react'
import { Map } from 'immutable'
import { Provider } from 'react-redux'

import * as dayjs from 'dayjs'
import * as LocalizedFormat from 'dayjs/plugin/localizedFormat'

import {
  Store,
  applyMiddleware,
  compose,
  createStore
} from 'redux'

import createDebounce from 'redux-debounced'
import thunk from 'redux-thunk'
import { combinedReducers } from './src/redux/reducers'

import {
  AppState
} from './src/types/common'

dayjs.extend(LocalizedFormat)

const debounce = createDebounce()

function configureStore (initialState = Map()): Store<AppState> {
  return createStore(
    combinedReducers,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState as any,
    compose(
      applyMiddleware(debounce, thunk)
    )
  )
}

const store = configureStore()

export const wrapRootElement = ({ element }: { element: React.ReactElement }): JSX.Element => (
  <Provider store={store}>
    { element }
  </Provider>
)

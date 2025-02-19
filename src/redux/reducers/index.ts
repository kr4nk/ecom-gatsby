import { combineReducers } from 'redux-immutable'
import { Reducer } from 'redux-actions'

import app from './app'
import fields from './fields'

import {
  APP,
  FIELDS
} from '../selector-consts'

import {
  NullableState,
  AppState
} from '../../types/common'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const combinedReducers = combineReducers<AppState, any>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [APP]: app as Reducer<NullableState, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [FIELDS]: fields as Reducer<NullableState, any>
})

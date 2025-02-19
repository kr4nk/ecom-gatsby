import { createAction } from 'redux-actions'

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_COMPLETE,

  CALL_ACTION,

  CHANGE_INPUT,
  CHANGE_CHECKBOX,

  SET_IN,
  VALIDATE_INPUT,
  VALIDATE_INPUT_BY_FLAG,

  SELECT_COMBOBOX,
  SELECT_COMBOBOX_AND_ADD_TO_LIST,

  REMOVE_FROM_LIST_BY_INDEX,
  REMOVE_FROM_LIST_BY_VALUE,
  ADD_TO_LIST_WITH_TEMPLATE,
  ADD_TO_LIST,
  ADD_TO_LIST_UNIQUE,
  CHANGE_LIST_ITEM,

  MAP_SET,
  MAP_REMOVE,
  MAP_REMOVE_IN,

  PAGINATION_TO_BEGIN,
  PAGINATION_TO_END,
  PAGINATION_GO_NEXT,
  PAGINATION_GO_BACK
} from '../action-types'

export const fetchRequest = createAction(FETCH_REQUEST)
export const fetchSuccess = createAction(FETCH_SUCCESS)
export const fetchFailure = createAction(FETCH_FAILURE)
export const fetchComplete = createAction(FETCH_COMPLETE)

export const callAction = createAction(CALL_ACTION)

export const setIn = createAction(SET_IN)
export const changeInput = createAction(CHANGE_INPUT)
export const changeCheckbox = createAction(CHANGE_CHECKBOX)

export const validateInput = createAction(VALIDATE_INPUT)
export const validateInputByFlag = createAction(VALIDATE_INPUT_BY_FLAG)

export const selectCombobox = createAction(SELECT_COMBOBOX)
export const selectComboboxAndAddToList = createAction(SELECT_COMBOBOX_AND_ADD_TO_LIST)

export const removeFromListByIndex = createAction(REMOVE_FROM_LIST_BY_INDEX)
export const removeFromListByValue = createAction(REMOVE_FROM_LIST_BY_VALUE)
export const addToListWithTemplate = createAction(ADD_TO_LIST_WITH_TEMPLATE)
export const addToList = createAction(ADD_TO_LIST)
export const addToListUnique = createAction(ADD_TO_LIST_UNIQUE)
export const changeListItem = createAction(CHANGE_LIST_ITEM)

export const mapSet = createAction(MAP_SET)
export const mapRemove = createAction(MAP_REMOVE)
export const mapRemoveIn = createAction(MAP_REMOVE_IN)

export const paginationToBegin = createAction(PAGINATION_TO_BEGIN)
export const paginationToEnd = createAction(PAGINATION_TO_END)
export const paginationGoNext = createAction(PAGINATION_GO_NEXT)
export const paginationGoBack = createAction(PAGINATION_GO_BACK)

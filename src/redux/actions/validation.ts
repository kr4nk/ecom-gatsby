import {
  testPass,
  testPassForLowerCase,
  testPassForCapital,
  testPassForNumber
} from '../../utils/regexp'

import {
  setIn,
  validateInput,
  changeCheckbox,
  selectCombobox
} from './fields'

import {
  Dispatch,
  TImmutableCheckbox,
  isImmutableCheckbox,
  TImmutableCombobox,
  isImmutableCombobox,
  isImmutableFieldMap,
  TImmutableList,
  isImmutableList,
  TImmutableLoading,
  isImmutableLoading,
  TImmutableNumber,
  isImmutableNumber,
  TImmutablePassword,
  isImmutablePassword,
  TImmutableInput,
  isImmutableInput
} from '../../types/common'

import { VALUE, PATH, REQUIRED, CHECKED, ID, IS_FETCHING, LIST } from '../selector-consts'

function checkCheckbox (field: TImmutableCheckbox, dispatch: Dispatch): boolean {
  const checked = field.get(CHECKED)

  const required = field.get(REQUIRED) !== undefined
    ? field.get(REQUIRED)
    : true

  const valid = required ? checked : true

  if (!valid) {
    dispatch(
      changeCheckbox({
        path: field.get(PATH),
        valid,
        invalid: !valid,
        checked
      })
    )
  }

  return valid
}

function checkCombobox (field: TImmutableCombobox, dispatch: Dispatch): boolean {
  const valid = field.get(ID) !== ''

  if (!valid) {
    dispatch(
      selectCombobox({
        path: field.get(PATH),
        valid,
        invalid: !valid
      })
    )
  }

  return valid
}

function checkPassword (field: TImmutablePassword, dispatch: Dispatch): boolean {
  const value = field.get(VALUE)
  const valid = testPass(value)

  dispatch(
    setIn({
      path: field.get(PATH),
      valid,
      invalid: !valid,
      passLength: valid || value.length >= 8,
      capital: valid || testPassForCapital(value),
      lowercase: valid || testPassForLowerCase(value),
      digit: valid || testPassForNumber(value),
    })
  )

  return valid
}

function checkInput (field: TImmutableInput, dispatch: Dispatch): boolean {
  const value = field.get(VALUE)

  const required = field.get(REQUIRED) !== undefined
    ? field.get(REQUIRED)
    : true

  const isValid = required
    ? value !== ''
    : true

  if (!isValid) {
    dispatch(
      validateInput({
        path: field.get(PATH),
        isValid,
        value
      })
    )
  }

  return isValid
}

function checkLoading (field: TImmutableLoading, _dispatch: Dispatch): boolean {
  return field.get(IS_FETCHING) === false
}

function checkNumber (field: TImmutableNumber, dispatch: Dispatch): boolean {
  const value = field.get(VALUE)
  const min = field.get('min') || 0
  const max = field.get('max') || Infinity
  const isValid = value >= min && value <= max

  if (!isValid) {
    dispatch(
      validateInput({
        path: field.get(PATH),
        isValid,
        value
      })
    )
  }

  return isValid
}

function checkList (field: TImmutableList, dispatch: Dispatch): boolean {
  return field.get(LIST).reduce<boolean>(function reducer (acc, item): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-use-before-define
    return validateField(item as any, dispatch) && acc
  }, true)
}

export interface CustomValidate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(field: any, dispatch: Dispatch): boolean;
}

function isCustomValidate (field: CustomValidate): field is CustomValidate {
  return field.field !== undefined && field.validate instanceof Function
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, perf-standard/check-function-inline
function validateField (field: any, dispatch: Dispatch): boolean {
  switch (typeof field) {
    case 'number':
    case 'string':
    case 'bigint':
    case 'boolean':
      return true
    default:
      break
  }

  if (isCustomValidate(field)) {
    return field.validate(field.field, dispatch)
  }

  if (isImmutableLoading(field)) {
    if (!checkLoading(field, dispatch)) {
      return false
    }
  }

  if (isImmutablePassword(field)) {
    return checkPassword(field, dispatch)
  } else if (isImmutableCheckbox(field)) {
    return checkCheckbox(field, dispatch)
  } else if (isImmutableCombobox(field)) {
    return checkCombobox(field, dispatch)
  } else if (isImmutableFieldMap(field)) {
    return false
  } else if (isImmutableList(field)) {
    return checkList(field, dispatch)
  } else if (isImmutableNumber(field)) {
    return checkNumber(field, dispatch)
  } else if (isImmutableInput(field)) {
    return checkInput(field, dispatch)
  }

  return false
}

interface FieldsMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function validateFields (fields: FieldsMap, dispatch: Dispatch): boolean {
  let valid = true

  for (let key in fields) {
    if (fields.hasOwnProperty(key)) {
      valid = validateField(fields[key], dispatch) && valid
    }
  }

  return valid
}

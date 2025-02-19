import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { sanitizePhone } from '../../utils/sanitize-phone'

import {
  getIsFetching,
  getFieldPhone
} from '../../redux/selectors/admin-user-new'

import { debouncedValidatePhone } from '../../redux/actions/common'

import { changeInput } from '../../redux/actions/fields'

import SvgPhone from '../../components/svg/phone'
import SvgSpinner from '../../components/svg/spinner'

import InputCustom from '../../components/fields/input-custom'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  OnOff,
  ReduxState,
  TImmutableInput,
  TImmutablePaths,
  TImmutableLoading,
  DebouncedFieldAction
} from '../../types/common'

import { IS_FETCHING, ERROR_MESSAGE, INVALID } from '../../redux/selector-consts'

interface StateProps {
  params: TImmutableInput & TImmutableLoading;
  disabled: boolean;
}

interface DispatchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeInput (...args: any[]): void;
  debouncedValidatePhone (path: TImmutablePaths, value: string): DebouncedFieldAction;
}

interface MergedProps {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  autoComplete: OnOff;
  invalidMessage?: string;
  icon: React.ReactNode;
  className: string;
  invalidClassName?: string;
  disabled: boolean;
  params: TImmutableInput;

  onChange (value: string, path: TImmutablePaths): void;
  onFocus (value: string, path: TImmutablePaths): void;
  onBlur (value: string, path: TImmutablePaths): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state),
  params: getFieldPhone(state)
})

const mapDispatchToProps: DispatchProps = {
  debouncedValidatePhone,
  changeInput
}

function mergeProps (
  { disabled, params }: StateProps,
  { changeInput, debouncedValidatePhone }: DispatchProps
): MergedProps {
  const icon = params.get(IS_FETCHING)
    ? <SvgSpinner />
    : <SvgPhone />

  const invalidMessage = params.get(ERROR_MESSAGE) || undefined

  const invalidClassName = params.get(INVALID)
    ? fields.invalidWarning
    : undefined

  return {
    id: 'phone',
    name: 'tel',
    type: 'tel',
    labelText: 'Phone number',
    placeholder: '+12345678910',
    autoComplete: 'on' as OnOff,
    invalidMessage,
    icon,
    invalidClassName,
    className: classnames(
      fields.field,
      grid.colMd2
    ),
    disabled,
    params,
    onChange (value, path): void {
      value = sanitizePhone(value)

      changeInput({
        path, value
      })

      debouncedValidatePhone(path, value)
    },
    onFocus (): void {},
    onBlur (): void {}
  }
}

const InputPhone = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(InputCustom)

export default InputPhone

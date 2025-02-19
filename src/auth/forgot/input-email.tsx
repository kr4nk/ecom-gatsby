import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { emailRegexp } from '../../utils/regexp'
import { sanitizeEmail } from '../../utils/sanitize-email'

import {
  getIsFetching,
  getFieldEmail
} from '../../redux/selectors/auth-forgot'

import { validateInput } from '../../redux/actions/fields'

import InputCustom from '../../components/fields/input-custom'

import SvgEmail from '../../components/svg/email'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  OnOff,
  Dispatch,
  ReduxState,
  TImmutableInput,
  TImmutablePaths
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  icon: React.ReactNode;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

interface DispatchProps {
  onChange (value: string, path: TImmutablePaths): void;
  onFocus (value: string, path: TImmutablePaths): void;
  onBlur (value: string, path: TImmutablePaths): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'email',
  name: 'username',
  type: 'email',
  labelText: 'Email',
  placeholder: 'email@example.com',
  autoCapitalize: 'off' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  icon: <SvgEmail />,
  className: classnames(
    fields.field,
    grid.colMd4
  ),
  disabled: getIsFetching(state),
  params: getFieldEmail(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange (value, path): void {
    value = sanitizeEmail(value)

    const isValid = (
      value.length > 5 &&
      value.length <= 320
    ) && emailRegexp(value)

    dispatch(
      validateInput({
        path, value, isValid
      })
    )
  },
  onFocus (): void {},
  onBlur (): void {}
})

const InputEmail = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputCustom)

export default InputEmail

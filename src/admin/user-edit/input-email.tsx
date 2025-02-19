import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import { sanitizeEmail } from '../../utils/sanitize-email'
import { emailRegexp } from '../../utils/regexp'

import {
  getIsFetching,
  getFieldEmail
} from '../../redux/selectors/admin-user-edit'

import {
  changeInput,
  validateInputByFlag
} from '../../redux/actions/fields'

import InputCustom from '../../components/fields/input-custom'

import SvgEmail from '../../components/svg/email'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { ReduxState, Dispatch, TImmutableInput, TImmutablePaths, OnOff } from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  autoComplete: OnOff;
  autoCapitalize: OnOff;
  autoCorrect: OnOff;
  icon: React.ReactNode;
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
  name: 'email',
  type: 'email',
  labelText: 'Email *',
  placeholder: 'email@example.com',
  autoCapitalize: 'off' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  icon: <SvgEmail />,
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  disabled: getIsFetching(state),
  params: getFieldEmail(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange (value, path): void {
    dispatch(
      changeInput({
        path, value: sanitizeEmail(value)
      })
    )
  },
  onBlur (value: string, path: TImmutablePaths): void {
    value = sanitizeEmail(value)

    dispatch(
      validateInputByFlag({
        path, value, isValid: emailRegexp(value)
      })
    )
  },
  onFocus (): void {}
})

const InputEmail = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputCustom)

export default InputEmail

import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  testPass,
  testPassForLowerCase,
  testPassForCapital,
  testPassForNumber
} from '../../utils/regexp'

import {
  getIsFetching,
  getFieldPassword
} from '../../redux/selectors/auth-reset'

import { setIn } from '../../redux/actions/fields'

import InputPassword from '../../components/fields/input-password'

import SvgKey from '../../components/svg/key'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  OnOff,
  Dispatch,
  ReduxState,
  TImmutablePaths,
  TImmutablePassword
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  className: string;
  autoComplete: OnOff;
  icon: React.ReactNode;
  disabled: boolean;
  params: TImmutablePassword;
}

interface DispatchProps {
  onChange (value: string, path: TImmutablePaths): void;
  onFocus (value: string, path: TImmutablePaths): void;
  onBlur (value: string, path: TImmutablePaths): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'password',
  name: 'password',
  labelText: 'Password',
  placeholder: '················',
  className: classnames(
    fields.field,
    grid.colMd4
  ),
  autoComplete: 'on' as OnOff,
  icon: <SvgKey />,
  disabled: getIsFetching(state),
  params: getFieldPassword(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange (value, path): void {
    const valid = testPass(value)

    dispatch(
      setIn({
        path,
        value,
        valid,
        invalid: !valid,
        passLength: valid || value.length >= 8,
        capital: valid || testPassForCapital(value),
        lowercase: valid || testPassForLowerCase(value),
        digit: valid || testPassForNumber(value),
      })
    )
  },
  onFocus (): void {},
  onBlur (): void {}
})

const InputPasswordReset = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputPassword)

export default InputPasswordReset

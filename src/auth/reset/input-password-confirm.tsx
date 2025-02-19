import * as React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldPasswordConfirm
} from '../../redux/selectors/auth-reset'

import { changePasswordConfirm } from '../../redux/actions/auth-reset'

import InputCustom from '../../components/fields/input-custom'

import SvgKey from '../../components/svg/key'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  OnOff,
  Dispatch,
  ReduxState,
  TImmutablePaths,
  TImmutableInput
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  className: string;
  autoComplete: OnOff;
  icon: React.ReactNode;
  disabled: boolean;
  params: TImmutableInput;
}

interface DispatchProps {
  onChange (value: string, path: TImmutablePaths): void;
  onFocus (value: string, path: TImmutablePaths): void;
  onBlur (value: string, path: TImmutablePaths): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'passwordConfirm',
  name: 'new-password',
  type: 'password',
  labelText: 'Password confirmation',
  placeholder: '················',
  className: classnames(
    fields.field,
    grid.colMd4
  ),
  autoComplete: 'on' as OnOff,
  icon: <SvgKey />,
  disabled: getIsFetching(state),
  params: getFieldPasswordConfirm(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange (value, path): void {
    dispatch(
      changePasswordConfirm(value, path)
    )
  },
  onFocus (): void {},
  onBlur (): void {}
})

const InputPasswordConfirm = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputCustom)

export default InputPasswordConfirm

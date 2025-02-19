import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldCode
} from '../../redux/selectors/auth-reset'

import { validateInput } from '../../redux/actions/fields'

import InputCustom from '../../components/fields/input-custom'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  Dispatch,
  TImmutablePaths,
  TImmutableInput
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  inputMode: string;
  labelText: string;
  placeholder: string;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

interface DispatchProps {
  onChange(value: string, path: TImmutablePaths): void;
  onFocus(value: string, path: TImmutablePaths): void;
  onBlur(value: string, path: TImmutablePaths): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'codeConfirm',
  name: 'codeConfirm',
  inputMode: 'number',
  labelText: 'Confirmation code',
  placeholder: '123456',
  className: classnames(
    fields.field,
    grid.colMd4
  ),
  disabled: getIsFetching(state),
  params: getFieldCode(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange (value: string, path: TImmutablePaths): void {
    dispatch(
      validateInput({
        path, value
      })
    )
  },
  onBlur (): void {},
  onFocus (): void {}
})

const InputCodeConfirm = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputCustom)

export default InputCodeConfirm

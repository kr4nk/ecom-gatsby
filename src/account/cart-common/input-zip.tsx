import { connect } from 'react-redux'
import classnames from 'classnames'

import { sanitizeZip } from '../../utils/sanitize-zip'

import { getFieldZip } from '../../redux/selectors/user-cart'

import {
  changeInput,
  validateInput
} from '../../redux/actions/fields'

import InputCustom from '../../components/fields/input-custom'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  Dispatch,
  OnOff,
  TImmutableInput,
  TImmutablePaths
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  type: string;
  pattern: string;
  inputMode: string;
  labelText: string;
  placeholder: string;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  noValidate: boolean;
  className: string;
  params: TImmutableInput;
}

interface DispatchProps {
  onChange(value: string, path: TImmutablePaths): void;
  onBlur(value: string, path: TImmutablePaths): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'zip',
  name: 'postal-code',
  type: 'text',
  pattern: '[0-9]*',
  inputMode: 'numeric',
  labelText: 'ZIP code *',
  placeholder: '12345',
  autoCapitalize: 'off' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  noValidate: true,
  className: classnames(
    fields.field,
    grid.colMd1
  ),
  params: getFieldZip(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange (value, path): void {
    dispatch(
      changeInput({
        path,
        value: sanitizeZip(value)
      })
    )
  },
  onBlur (value, path): void {
    dispatch(
      validateInput({
        path,
        value: sanitizeZip(value)
      })
    )
  }
})

const InputZip = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputCustom)

export default InputZip

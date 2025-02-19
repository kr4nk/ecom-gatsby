import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldAddressLine1
} from '../../redux/selectors/user-profile'

import Input from '../../components/fields/input'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { ReduxState, TImmutableInput, OnOff } from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  autoComplete: OnOff;
  autoCapitalize: OnOff;
  autoCorrect: OnOff;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'addressLine1',
  name: 'address-line1',
  type: 'text',
  labelText: 'Address Line 1 *',
  placeholder: 'Street Address',
  autoComplete: 'on' as OnOff,
  autoCapitalize: 'off' as OnOff,
  autoCorrect: 'off' as OnOff,
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  disabled: getIsFetching(state),
  params: getFieldAddressLine1(state)
})

const InputAddressLine1 = connect(
  mapStateToProps
)(Input)

export default InputAddressLine1

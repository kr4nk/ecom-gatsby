import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldAddressLine2
} from '../../redux/selectors/user-profile'

import Input from '../../components/fields/input'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { ReduxState, TImmutableInput, OnOff } from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  required: boolean;
  autoComplete: OnOff;
  autoCapitalize: OnOff;
  autoCorrect: OnOff;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'addressLine2',
  name: 'address-line2',
  labelText: 'Address Line 2',
  placeholder: 'Street Address',
  required: false,
  autoComplete: 'on' as OnOff,
  autoCapitalize: 'off' as OnOff,
  autoCorrect: 'off' as OnOff,
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  disabled: getIsFetching(state),
  params: getFieldAddressLine2(state)
})

const InputAddressLine2 = connect(
  mapStateToProps
)(Input)

export default InputAddressLine2

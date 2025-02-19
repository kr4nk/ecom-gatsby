import { connect } from 'react-redux'
import classnames from 'classnames'

import { getFieldAddressLine2 } from '../../redux/selectors/user-cart'

import Input from '../../components/fields/input'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  OnOff,
  TImmutableInput
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  type: string;
  labelText: string;
  placeholder: string;
  required: boolean;
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  className: string;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'addressLine2',
  name: 'address-line2',
  type: 'text',
  labelText: 'Address Line 2',
  placeholder: 'Street Address',
  required: false,
  autoCapitalize: 'off' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  params: getFieldAddressLine2(state)
})

const InputAddressLine2 = connect(
  mapStateToProps
)(Input)

export default InputAddressLine2

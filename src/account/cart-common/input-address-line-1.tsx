import { connect } from 'react-redux'
import classnames from 'classnames'

import { getFieldAddressLine1 } from '../../redux/selectors/user-cart'

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
  autoCapitalize: OnOff;
  autoComplete: OnOff;
  autoCorrect: OnOff;
  className: string;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'addressLine1',
  name: 'address-line1',
  type: 'text',
  labelText: 'Address Line 1 *',
  placeholder: 'Street Address',
  autoCapitalize: 'off' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  className: classnames(
    fields.field,
    grid.colMd2
  ),
  params: getFieldAddressLine1(state)
})

const InputAddressLine1 = connect(
  mapStateToProps
)(Input)

export default InputAddressLine1

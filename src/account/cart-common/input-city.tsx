import { connect } from 'react-redux'
import classnames from 'classnames'

import { getFieldCity } from '../../redux/selectors/user-cart'

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
  id: 'city',
  name: 'address-level2',
  type: 'text',
  labelText: 'City *',
  placeholder: 'City',
  autoCapitalize: 'off' as OnOff,
  autoComplete: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  className: classnames(
    fields.field,
    grid.colMd1
  ),
  params: getFieldCity(state)
})

const InputCity = connect(
  mapStateToProps
)(Input)

export default InputCity

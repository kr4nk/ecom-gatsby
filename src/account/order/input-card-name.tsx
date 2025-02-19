import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldCardName
} from '../../redux/selectors/user-order'

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
  invalidMessage: string;
  autoComplete: OnOff;
  autoCapitalize: OnOff;
  autoCorrect: OnOff;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'cardName',
  name: 'name',
  type: 'text',
  labelText: 'Name on Card *',
  placeholder: 'Full Name',
  invalidMessage: 'Please enter your full name',
  autoComplete: 'on' as OnOff,
  autoCapitalize: 'on' as OnOff,
  autoCorrect: 'off' as OnOff,
  className: classnames(
    fields.field,
    grid.colMd4
  ),
  disabled: getIsFetching(state),
  params: getFieldCardName(state)
})

const InputCardName = connect(
  mapStateToProps
)(Input)

export default InputCardName

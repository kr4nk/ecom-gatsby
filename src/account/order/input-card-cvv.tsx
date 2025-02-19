import classnames from 'classnames'

import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldCardSecCode
} from '../../redux/selectors/user-order'

import Input from '../../components/fields/input'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  TImmutableInput
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  inputMode: string;
  labelText: string;
  placeholder: string;
  invalidMessage: string;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'cardCvv',
  name: 'cardCvv',
  inputMode: 'number',
  labelText: 'Security Code *',
  placeholder: '000',
  invalidMessage: 'Please enter the CVV/CVC of your card',
  className: classnames(
    fields.field,
    grid.colSm2
  ),
  disabled: getIsFetching(state),
  params: getFieldCardSecCode(state)
})

const InputCardCvv = connect(
  mapStateToProps
)(Input)

export default InputCardCvv

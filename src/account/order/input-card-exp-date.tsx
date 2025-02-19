import classnames from 'classnames'

import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldCardExpDate
} from '../../redux/selectors/user-order'

import Input from '../../components/fields/input'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { ReduxState, TImmutableInput } from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  invalidMessage: string;
  className: string;
  disabled: boolean;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'cardExpDate',
  name: 'cardExpDate',
  labelText: 'Exp. Date *',
  placeholder: 'MM/YY',
  invalidMessage: `Please enter your card's expiration date`,

  className: classnames(
    fields.field,
    grid.colSm2
  ),
  disabled: getIsFetching(state),
  params: getFieldCardExpDate(state)
})

const InputCardExpDate = connect(
  mapStateToProps
)(Input)

export default InputCardExpDate

import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldRefundReason
} from '../../redux/selectors/user-order'

import Textarea from '../../components/fields/textarea'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

import { ReduxState, TImmutableInput } from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  disabled: boolean;
  className: string;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'refund-reason',
  name: 'refund-reason',
  labelText: 'Refund reason',
  placeholder: 'Refund reason',
  disabled: getIsFetching(state),
  className: classnames(
    fields.field,
    grid.colMd4
  ),
  params: getFieldRefundReason(state)
})

const TextareaReason = connect(
  mapStateToProps
)(Textarea)

export default TextareaReason

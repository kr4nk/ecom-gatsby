import { connect } from 'react-redux'

import { getFieldPaymentMethod } from '../../redux/selectors/user-order'

import Payment from '../common/payment'

import {
  ReduxState,
  TImmutableInput
} from '../../types/common'

interface StateProps {
  method: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  method: getFieldPaymentMethod(state)
})

export default connect(
  mapStateToProps
)(Payment)

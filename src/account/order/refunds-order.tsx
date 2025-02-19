import { connect } from 'react-redux'

import { getRefundsList } from '../../redux/selectors/user-order'

import RefundsOrder from '../common/refunds-order'

import { ReduxState } from '../../types/common'
import { TOrderRefunds } from '../../types/account'

interface StateProps {
  refunds: TOrderRefunds;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  refunds: getRefundsList(state)
})

export default connect(
  mapStateToProps
)(RefundsOrder)

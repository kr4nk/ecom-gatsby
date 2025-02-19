import { connect } from 'react-redux'

import { getOrder } from '../../redux/selectors/user-order'

import PaymentInfo from '../common/payment-info'

import { ReduxState } from '../../types/common'

import { PAYMENT } from '../../redux/selector-consts'

interface StateProps {
  payment: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  payment: getOrder(state).get(PAYMENT) || ''
})

export default connect(
  mapStateToProps
)(PaymentInfo)

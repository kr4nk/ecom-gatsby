import { connect } from 'react-redux'

import {
  getBankAccountNumber,
  getBankAccountRoutingDirect,
  getBankAccountRoutingWire
} from '../../redux/selectors/app'

import PaymentWireInfo from '../common/payment-wire-info'

import { ReduxState } from '../../types/common'

interface StateProps {
  accountNumber: string;
  routingDirect: string;
  routingWire: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  accountNumber: getBankAccountNumber(state),
  routingDirect: getBankAccountRoutingDirect(state),
  routingWire: getBankAccountRoutingWire(state)
})

export default connect(
  mapStateToProps
)(PaymentWireInfo)

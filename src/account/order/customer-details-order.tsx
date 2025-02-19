import { connect } from 'react-redux'

import { getCustomer } from '../../redux/selectors/user-order'

import CustomerDetailsOrder from '../common/customer-details-order'

import { ReduxState } from '../../types/common'
import { TUser } from '../../types/account'

interface StateProps {
  customer: TUser;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  customer: getCustomer(state)
})

export default connect(
  mapStateToProps
)(CustomerDetailsOrder)

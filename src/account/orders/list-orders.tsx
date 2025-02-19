import { connect } from 'react-redux'

import { getOrdersItems } from '../../redux/selectors/user-orders'

import ListOrders from '../common/list-orders'

import { ReduxState } from '../../types/common'
import { TOrders } from '../../types/account'

interface StateProps {
  items: TOrders;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  items: getOrdersItems(state)
})

export default connect(
  mapStateToProps
)(ListOrders)

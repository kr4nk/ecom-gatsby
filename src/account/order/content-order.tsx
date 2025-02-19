import { connect } from 'react-redux'

import {
  getIsFetching,
  getOrder
} from '../../redux/selectors/user-order'

import ContentOrder from '../common/content-order'

import { ReduxState } from '../../types/common'
import { TOrder } from '../../types/account'

interface StateProps {
  isFetching: boolean;
  order: TOrder;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isFetching: getIsFetching(state),
  order: getOrder(state)
})

export default connect(
  mapStateToProps
)(ContentOrder)

import { connect } from 'react-redux'

import { getOrder } from '../../redux/selectors/user-order'

import Badges from '../common/badges'

import { ReduxState } from '../../types/common'
import { TOrder } from '../../types/account'

interface StateProps {
  order: TOrder;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  order: getOrder(state)
})

export default connect(
  mapStateToProps
)(Badges)

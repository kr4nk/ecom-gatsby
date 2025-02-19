import { connect } from 'react-redux'

import { getOrder } from '../../redux/selectors/user-order'

import ControlsOrder from '../common/controls-order'

import { ReduxState } from '../../types/common'

import { IS_PAID } from '../../redux/selector-consts'

interface StateProps {
  isPaid: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isPaid: getOrder(state)
    .get(IS_PAID)
})

export default connect(
  mapStateToProps
)(ControlsOrder)

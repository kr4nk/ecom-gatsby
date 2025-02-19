import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-order'

import { payForOrder } from '../../redux/actions/user-order'
import ButtonAcceptOrder from '../common/button-accept-order'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

const mapDispatchToProps: DispatchProps = {
  onClick: payForOrder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonAcceptOrder)

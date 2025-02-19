import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-order'

import { cancelOrder } from '../../redux/actions/user-order'

import ButtonCancelOrder from '../common/button-cancel-order'

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
  onClick: cancelOrder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonCancelOrder)

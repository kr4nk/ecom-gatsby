import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-cart'

import { getOrderCopy } from '../../redux/actions/user-cart'

import ButtonSendOrder from '../common/button-send-order'

import { ReduxState, Dispatch } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClick (): void {
    dispatch(
      getOrderCopy(true)
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonSendOrder)

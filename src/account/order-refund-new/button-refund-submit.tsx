import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-order'

import { requestRefund } from '../../redux/actions/user-order'

import ButtonRefundSubmit from '../common/button-refund-submit'

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
  onClick: requestRefund
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonRefundSubmit)

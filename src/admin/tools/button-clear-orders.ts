import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/admin-tools'

import { databaseClearOrders } from '../../redux/actions/admin-tools'

import ButtonClearOrders from './src/button-clear-orders'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick (): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

const mapDispatchToProps: DispatchProps = {
  onClick: databaseClearOrders
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonClearOrders)

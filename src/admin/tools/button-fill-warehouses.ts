import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/admin-tools'

import { databaseFillWarehouses } from '../../redux/actions/admin-tools'

import ButtonFillWarehouses from './src/button-fill-warehouses'

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
  onClick: databaseFillWarehouses
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonFillWarehouses)

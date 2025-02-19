import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/admin-tools'

import { databaseClear } from '../../redux/actions/admin-tools'

import ButtonClearDatabase from './src/button-clear-database'

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
  onClick: databaseClear
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonClearDatabase)

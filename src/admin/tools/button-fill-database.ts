import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/admin-tools'

import { databaseFill } from '../../redux/actions/admin-tools'

import ButtonFillDatabase from './src/button-fill-database'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: () => void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

const mapDispatchToProps: DispatchProps = {
  onClick: databaseFill
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonFillDatabase)

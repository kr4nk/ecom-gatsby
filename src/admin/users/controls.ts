import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/admin-users'

import ControlsUsers from './src/controls'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

export default connect(
  mapStateToProps
)(ControlsUsers)

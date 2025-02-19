import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/auth-reset'

import ButtonResetAndSignIn from '../common/button-reset-and-signin'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

export default connect(
  mapStateToProps
)(ButtonResetAndSignIn)

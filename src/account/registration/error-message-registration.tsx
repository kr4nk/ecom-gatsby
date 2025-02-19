import { connect } from 'react-redux'

import { getErrorMessage } from '../../redux/selectors/user-registration'

import ErrorMessageRegistration from '../common/error-message-registration'

import { ReduxState } from '../../types/common'

interface StateProps {
  errorMessage: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  errorMessage: getErrorMessage(state)
})

export default connect(
  mapStateToProps
)(ErrorMessageRegistration)

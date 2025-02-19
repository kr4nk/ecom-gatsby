import { connect } from 'react-redux'

import {
  getErrorMessage,
  getIsAccountExists,
  getFieldEmail
} from '../../redux/selectors/auth-forgot'

import ErrorBlock from '../common/error-block-forgot'

import { ReduxState, TImmutableInput } from '../../types/common'

interface StateProps {
  params: TImmutableInput;
  isAccountExists: boolean;
  errorMessage: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  params: getFieldEmail(state),
  isAccountExists: getIsAccountExists(state),
  errorMessage: getErrorMessage(state)
})

export default connect(
  mapStateToProps
)(ErrorBlock)

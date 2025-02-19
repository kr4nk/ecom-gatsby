import { connect } from 'react-redux'

import { getFieldPassword } from '../../redux/selectors/auth-password'

import PasswordHint from '../../components/common/password-hint'

import { ReduxState } from '../../types/common'

import {
  PASSWORD_LENGTH,
  PASSWORD_CAPITAL,
  PASSWORD_LOWERCASE,
  PASSWORD_DIGIT
} from '../../redux/selector-consts'

interface StateProps {
  passLength: boolean;
  capital: boolean;
  lowercase: boolean;
  digit: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => {
  const password = getFieldPassword(state)

  return {
    passLength: password.get(PASSWORD_LENGTH),
    capital: password.get(PASSWORD_CAPITAL),
    lowercase: password.get(PASSWORD_LOWERCASE),
    digit: password.get(PASSWORD_DIGIT)
  }
}

export default connect(
  mapStateToProps
)(PasswordHint)

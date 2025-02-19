import * as React from 'react'
import { connect } from 'react-redux'

import { getFieldPassword } from '../../redux/selectors/auth-reset'

import PasswordHint from '../../components/common/password-hint'

import { ReduxState, TImmutablePassword } from '../../types/common'

import {
  PASSWORD_LENGTH,
  PASSWORD_CAPITAL,
  PASSWORD_LOWERCASE,
  PASSWORD_DIGIT
} from '../../redux/selector-consts'

interface OwnProps {
  capsLock: boolean;
}

interface StateProps {
  password: TImmutablePassword;
}

const PasswordResetHint = ({ capsLock, password }: OwnProps & StateProps): JSX.Element => (
  <PasswordHint
    capsLock={capsLock}
    passLength={password.get(PASSWORD_LENGTH)}
    capital={password.get(PASSWORD_CAPITAL)}
    lowercase={password.get(PASSWORD_LOWERCASE)}
    digit={password.get(PASSWORD_DIGIT)}
  />
)

const mapStateToProps = (state: ReduxState): StateProps => ({
  password: getFieldPassword(state)
})

export default connect(
  mapStateToProps
)(PasswordResetHint)

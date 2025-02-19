import { connect } from 'react-redux'

import {
  getErrorMessage,
  getFieldPassword,
  getFieldPasswordConfirm,
  getFieldCode
} from '../../redux/selectors/auth-reset'

import { getFieldEmail } from '../../redux/selectors/auth-forgot'

import ErrorBlock from '../common/error-block-reset'

import {
  ReduxState,
  TImmutableInput,
  TImmutablePassword
} from '../../types/common'

import { VALUE } from '../../redux/selector-consts'

interface StateProps {
  email: string;
  code: TImmutableInput;
  password: TImmutablePassword;
  passwordConfirm: TImmutableInput;
  errorMessage: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  email: getFieldEmail(state).get(VALUE),
  code: getFieldCode(state),
  password: getFieldPassword(state),
  passwordConfirm: getFieldPasswordConfirm(state),
  errorMessage: getErrorMessage(state)
})

export default connect(
  mapStateToProps
)(ErrorBlock)

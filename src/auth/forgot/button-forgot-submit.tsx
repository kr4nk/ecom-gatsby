import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldEmail
} from '../../redux/selectors/auth-forgot'

import ButtonForgotSubmit from '../common/button-forgot-submit'

import { ReduxState } from '../../types/common'

import { VALID } from '../../redux/selector-consts'

interface StateProps {
  disabled: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state) ||
    !getFieldEmail(state).get(VALID)
})

export default connect(
  mapStateToProps
)(ButtonForgotSubmit)

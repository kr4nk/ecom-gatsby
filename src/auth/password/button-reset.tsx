import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldPassword,
  getFieldPasswordConfirm,
  getFieldAgreed
} from '../../redux/selectors/auth-password'

import ButtonReset from '../common/button-reset'

import { ReduxState } from '../../types/common'

import { CHECKED, INVALID } from '../../redux/selector-consts'

interface StateProps {
  disabled: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state) ||
    !getFieldAgreed(state).get(CHECKED) ||
    getFieldPassword(state).get(INVALID) ||
    getFieldPasswordConfirm(state).get(INVALID)
})

export default connect(
  mapStateToProps
)(ButtonReset)

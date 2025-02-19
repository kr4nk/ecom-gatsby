import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-registration'

import ButtonRegister from '../common/button-register'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

export default connect(
  mapStateToProps
)(ButtonRegister)

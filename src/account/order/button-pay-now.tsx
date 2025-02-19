import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-order'

import ButtonPayNow from '../common/button-pay-now'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

export default connect(
  mapStateToProps
)(ButtonPayNow)

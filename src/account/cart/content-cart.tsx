import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-cart'

import ContentCart from '../common/content-cart'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

export default connect(
  mapStateToProps
)(ContentCart)

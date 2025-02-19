import { connect } from 'react-redux'

import {
  getIsFetching,
  getIsFetchingVersions
} from '../../redux/selectors/user-cart'

import { makeOrder } from '../../redux/actions/user-cart'

import ContentCartReview from '../common/content-cart-review'

import { ReduxState } from '../../types/common'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state) || getIsFetchingVersions(state)
})

const mapDispatchToProps: DispatchProps = {
  onClick: makeOrder
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentCartReview)

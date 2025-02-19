import { connect } from 'react-redux'

import { getFieldComment } from '../../redux/selectors/user-order'

import CommentOrder from '../common/comment-order'

import {
  ReduxState,
  TImmutableInput,
  TImmutableLoading
} from '../../types/common'

interface StateProps {
  params: TImmutableInput & TImmutableLoading;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  params: getFieldComment(state)
})

export default connect(
  mapStateToProps
)(CommentOrder)

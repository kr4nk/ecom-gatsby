import { connect } from 'react-redux'

import { getFieldComment } from '../../redux/selectors/user-order'

import { sendComment } from '../../redux/actions/user-order'

import ButtonSendComment from '../common/button-send-comment'

import {
  ReduxState,
  TImmutableInput,
  TImmutableLoading
} from '../../types/common'

interface StateProps {
  params: TImmutableInput & TImmutableLoading;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  params: getFieldComment(state)
})

const mapDispatchToProps: DispatchProps = {
  onClick: sendComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonSendComment)

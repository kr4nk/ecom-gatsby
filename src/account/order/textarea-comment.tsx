import classnames from 'classnames'
import { connect } from 'react-redux'

import {
  getIsFetching,
  getFieldComment
} from '../../redux/selectors/user-order'

import Textarea from '../../components/fields/textarea'

import * as fields from '../../styles/fields.module.css'

import {
  ReduxState,
  TImmutableInput
} from '../../types/common'

interface StateProps {
  id: string;
  name: string;
  labelText: string;
  placeholder: string;
  className: string;
  required: boolean;
  disabled: boolean;
  params: TImmutableInput;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  id: 'comment',
  name: 'comment',
  required: false,
  labelText: 'Comment',
  placeholder: 'Leave a comment',
  disabled: getIsFetching(state),
  className: classnames(
    fields.field
    // fields.fieldFull
  ),
  params: getFieldComment(state)
})

const TextareaComment = connect(
  mapStateToProps
)(Textarea)

export default TextareaComment

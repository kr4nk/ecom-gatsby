import * as React from 'react'

import TextareaComment from '../order/textarea-comment'
import ButtonSendComment from '../order/button-send-comment'
import CommentOrderError from './comment-order-error'

import {
  TImmutableInput,
  TImmutableLoading
} from '../../types/common'

interface OwnProps {
  params: TImmutableInput & TImmutableLoading;
}

const OrderComment = ({ params }: OwnProps): JSX.Element => (
  <>
    <TextareaComment />

    <ButtonSendComment />

    <CommentOrderError
      params={params}
    />
  </>
)

export default OrderComment

import * as React from 'react'

import {
  TImmutableInput,
  TImmutableLoading
} from '../../types/common'

import { ERROR_MESSAGE } from '../../redux/selector-consts'

interface OwnProps {
  params: TImmutableInput & TImmutableLoading;
}

export default function OrderCommentError ({ params }: OwnProps): JSX.Element {
  return params.get(ERROR_MESSAGE)
    ? (
      <div>
        { params.get(ERROR_MESSAGE) }
      </div>
    )
    : (<></>)
}

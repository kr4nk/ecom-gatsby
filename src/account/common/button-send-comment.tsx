import * as React from 'react'
import classnames from 'classnames'

import * as buttons from '../../styles/buttons.module.css'

import {
  TImmutableInput,
  TImmutableLoading
} from '../../types/common'

import {
  IS_FETCHING,
  VALUE
} from '../../redux/selector-consts'

interface StateProps {
  params: TImmutableInput & TImmutableLoading;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ButtonSendComment = ({ params, onClick }: StateProps & DispatchProps): JSX.Element => (
  <button
    className={
      classnames(
        buttons.button,
        buttons.buttonPrimary,
        buttons.buttonSmall
      )
    }
    disabled={
      params.get(IS_FETCHING) || params.get(VALUE) === ''
    }
    onClick={onClick}
    type='button'
  >
    Add comment
  </button>
)

export default ButtonSendComment

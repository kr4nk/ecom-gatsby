import * as React from 'react'
import classnames from 'classnames'

import { isBrowser } from '../../utils/isbrowser'

import SvgArrowLeft from '../svg/arrow-left'

import * as buttonReturn from '../../styles/button-return.module.css'
import * as buttons from '../../styles/buttons.module.css'

interface OwnProps {
  text?: string;
}

// eslint-disable-next-line perf-standard/check-function-inline
function ButtonReturn (props: OwnProps): JSX.Element {
  const onClick = React.useCallback<React.MouseEventHandler>(
    function onClick (): void {
      if (isBrowser) {
        window.history.back()
      }
    }, []
  )

  return (
    <button
      className={
        classnames(
          buttons.button,
          buttons.buttonSmall,
          buttons.buttonIcon,
          buttonReturn.buttonReturn
        )
      }
      onClick={onClick}
      type='button'
    >
      <div
        role='img'
        aria-hidden
        className={buttons.icon}
      >
        <SvgArrowLeft />
      </div>

      { props.text }
    </button>
  )
}

ButtonReturn.defaultProps = {
  text: 'Return'
}

export default React.memo(ButtonReturn)

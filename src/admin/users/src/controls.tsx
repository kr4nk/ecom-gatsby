import * as React from 'react'
import { navigate } from '@reach/router'
import classnames from 'classnames'

import ButtonReturn from '../../../components/common/button-return'

import SvgAdd from '../../../components/svg/add'

import * as layout from '../../../styles/layout.module.css'
import * as buttons from '../../../styles/buttons.module.css'
import * as utility from '../../../styles/utility.module.css'

interface OwnProps {
  disabled: boolean;
}

function ControlsUsers ({ disabled }: OwnProps): JSX.Element {
  const onClick = React.useCallback<React.MouseEventHandler>(
    function useCallback (): void {
      navigate('/admin/user/new')
    }, []
  )

  return (
    <div
      className={
        classnames(
          layout.controls,
          utility.df,
          utility.jcsb
        )
      }
    >
      <ButtonReturn />

      <button
        className={
          classnames(
            buttons.button,
            buttons.buttonPrimary,
            buttons.buttonIcon,
            buttons.buttonSmall
          )
        }
        disabled={disabled}
        onClick={onClick}
      >
        <div
          role='img'
          aria-hidden
          className={buttons.icon}
        >
          <SvgAdd />
        </div>

        New User
      </button>
    </div>
  )
}

export default ControlsUsers

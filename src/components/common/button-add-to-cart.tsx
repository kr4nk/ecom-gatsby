import * as React from 'react'
import classnames from 'classnames'

import SvgCart from '../svg/cart'

import * as buttons from '../../styles/buttons.module.css'

interface OwnProps {
  onClick: React.MouseEventHandler;
}

function ButtonAddToCart ({ onClick }: OwnProps): JSX.Element {
  return (
    <button
      className={
        classnames(
          buttons.button,
          buttons.buttonPrimaryText,
          buttons.buttonAddToCart,
          buttons.buttonIcon
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
        <SvgCart />
      </div>

      Add to cart
    </button>
  )
}

export default React.memo(ButtonAddToCart)

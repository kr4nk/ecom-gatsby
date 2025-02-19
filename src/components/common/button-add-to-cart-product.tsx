import classnames from 'classnames'
import * as React from 'react'

import SvgCart from '../svg/cart'

import * as buttons from '../../styles/buttons.module.css'

interface OwnProps {
  onClick: React.MouseEventHandler;
}

function ButtonAddToCartProduct ({ onClick }: OwnProps): JSX.Element {
  return (
    <button
      className={
        classnames(
          buttons.button,
          buttons.buttonPrimary,
          buttons.buttonSmall,
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

export default React.memo(ButtonAddToCartProduct)

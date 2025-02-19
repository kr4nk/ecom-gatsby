import * as React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'

import ArrowLeftSvg from '../../components/svg/arrow-left'

import * as userCart from '../../styles/user-cart.module.css'
import * as layout from '../../styles/layout.module.css'
import * as buttons from '../../styles/buttons.module.css'
import * as utility from '../../styles/utility.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  nextClick?: React.MouseEventHandler;
  goPrev: React.MouseEventHandler;
  goNext: React.MouseEventHandler;
}

interface OwnProps {
  prev: string;
  next: string;
  prevPath: string;
  nextPath: string;
}

const ControlsCart = ({
  prev,
  next,
  prevPath,
  // eslint-disable-next-line @getify/proper-arrows/params
  nextPath,
  disabled,
  nextClick,
  goPrev,
  goNext
}: OwnProps & StateProps & DispatchProps): JSX.Element => (
  <div
    className={
      classnames(
        layout.controls,
        utility.df,
        utility.jcsb
      )
    }
  >
    <Link
      title={prev}
      to={prevPath}
      className={
        classnames(
          buttons.button,
          buttons.buttonSmall,
          buttons.buttonIcon
        )
      }
      onClick={goPrev}
    >
      <div
        role='img'
        aria-hidden
        className={buttons.icon}
      >
        <ArrowLeftSvg />
      </div>

      {
        prev
      }
    </Link>

    {
      // eslint-disable-next-line @getify/proper-arrows/return
      nextClick !== undefined
        ? (
          <button
            className={
              classnames(
                buttons.button,
                buttons.buttonPrimary,
                buttons.buttonSmall,
                userCart.buttonCartNext
              )
            }
            onClick={nextClick}
            disabled={disabled}
            type='button'
          >
            {
              next
            }
          </button>
        )
        : disabled || (
          <Link
            title={next}
            to={nextPath}
            className={
              classnames(
                buttons.button,
                buttons.buttonPrimary,
                buttons.buttonSmall,
                userCart.buttonCartNext,
                utility.tdn
              )
            }
            onClick={goNext}
          >
            {
              next
            }
          </Link>
        )
    }
  </div>
)

export default ControlsCart

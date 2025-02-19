import { event } from 'react-ga'
import { connect } from 'react-redux'

import ControlsCart from '../common/controls-cart'

interface OwnProps {
  disabled: boolean;
  prev: string;
  next: string;
  prevPath: string;
  nextPath: string;
  nextClick?: React.MouseEventHandler;
}

interface MergedProps {
  prev: string;
  next: string;
  prevPath: string;
  nextPath: string;
  nextClick?: React.MouseEventHandler;
  goPrev: React.MouseEventHandler;
  goNext: React.MouseEventHandler;
}

const mergeProps = (__: null, ___: null, {
  prev,
  // eslint-disable-next-line @getify/proper-arrows/params
  next,
  prevPath,
  nextPath,
  nextClick
}: OwnProps): MergedProps => ({
  prev,
  next,
  prevPath,
  nextPath,
  nextClick,
  goPrev (): void {
    event({
      category: 'Cart Shipping',
      action: prev
    })
  },
  goNext (): void {
    event({
      category: 'Cart Shipping',
      action: next
    })
  }
})

export default connect(null, null, mergeProps)(ControlsCart)

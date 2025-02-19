import { event } from 'react-ga'
import { connect } from 'react-redux'

import ControlsCart from '../common/controls-cart'

interface MergedProps {
  disabled: boolean;
  prev: string;
  next: string;
  prevPath: string;
  nextPath: string;
  nextClick: React.MouseEventHandler;
  goPrev: React.MouseEventHandler;
  goNext: React.MouseEventHandler;
}

interface OwnProps {
  disabled: boolean;
  prev: string;
  next: string;
  prevPath: string;
  nextPath: string;
  nextClick: React.MouseEventHandler<HTMLButtonElement>;
}

const mergeProps = (__: null, ___: null, {
  disabled,
  // eslint-disable-next-line @getify/proper-arrows/params
  prev,
  next,
  prevPath,
  nextPath,
  nextClick
}: OwnProps): MergedProps => ({
  disabled,
  prev,
  next,
  prevPath,
  nextPath,
  nextClick,
  goPrev (): void {
    event({
      category: 'Cart Review',
      action: prev
    })
  },
  goNext (): void {
    event({
      category: 'Cart Review',
      action: next
    })
  }
})

export default connect(
  null,
  null,
  mergeProps
)(ControlsCart)

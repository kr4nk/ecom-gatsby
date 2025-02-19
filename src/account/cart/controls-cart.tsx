import { event } from 'react-ga'
import { connect } from 'react-redux'

import { getIsFetching } from '../../redux/selectors/user-cart'

import ControlsCart from '../common/controls-cart'

import { ReduxState, Dispatch } from '../../types/common'

interface OwnProps {
  prev: string;
  next: string;
  prevPath: string;
  nextPath: string;
}

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  goPrev: React.MouseEventHandler;
  goNext: React.MouseEventHandler;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  disabled: getIsFetching(state)
})

// @ts-ignore
const mapDispatchToProps = (dispatch: Dispatch, { prev, next }: OwnProps): DispatchProps => ({
  goPrev (): void {
    event({
      category: 'Cart',
      action: prev
    })
  },
  goNext (): void {
    event({
      category: 'Cart',
      action: next
    })
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlsCart)

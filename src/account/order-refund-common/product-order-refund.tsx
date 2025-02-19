import { connect } from 'react-redux'

import {
  getRefundProductQuantity,
  getRefundProductQuantityByIndex
} from '../../redux/selectors/user-order'

import { mapSet } from '../../redux/actions/fields'

import ProductOrderRefund from '../common/product-order-refund'

import {
  ReduxState,
  Dispatch
} from '../../types/common'

import { TOrderProduct } from '../../types/account'

import {
  VERSION_ID,
  USER_ORDERS,
  REFUND,
  PRODUCTS
} from '../../redux/selector-consts'

interface OwnProps {
  refundIndex: number;
  product: TOrderProduct;
}

interface StateProps {
  refundQuantity: number;
}

interface DispatchProps {
  onChange(value: number): void;
}

const mapStateToProps = (state: ReduxState, { refundIndex, product }: OwnProps): StateProps => ({
  // eslint-disable-next-line @getify/proper-arrows/return
  refundQuantity: refundIndex !== -1
    ? getRefundProductQuantityByIndex(state, {
      versionId: product.get(VERSION_ID),
      index: refundIndex
    })
    : getRefundProductQuantity(state, product.get(VERSION_ID))
})

const mapDispatchToProps = (dispatch: Dispatch, { product }: OwnProps): DispatchProps => ({
  onChange (value): void {
    dispatch(
      mapSet({
        path: [USER_ORDERS, REFUND, PRODUCTS],
        key: product.get(VERSION_ID),
        value
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductOrderRefund)

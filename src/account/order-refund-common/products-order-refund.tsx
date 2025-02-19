import { connect } from 'react-redux'

import {
  getProducts,
  getRefundProducts
} from '../../redux/selectors/user-order'

import ProductsOrderRefund from '../common/products-order-refund'

import { ReduxState } from '../../types/common'
import { TOrderProducts } from '../../types/account';

interface OwnProps {
  index: number;
}

interface StateProps {
  products: TOrderProducts;
}

const mapStateToProps = (state: ReduxState, { index }: OwnProps): StateProps => ({
  // eslint-disable-next-line @getify/proper-arrows/return
  products: index !== -1
    ? getRefundProducts(state, index)
    : getProducts(state)
})

export default connect(
  mapStateToProps
)(ProductsOrderRefund)

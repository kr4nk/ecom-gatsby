import { connect } from 'react-redux'

import { getProductTotalCost } from '../../redux/selectors/user-cart'

import OrderTotalProduct from '../common/order-total-product'

import { ReduxState } from '../../types/common'
import { TProduct } from '../../types/account'

interface OwnProps {
  product: TProduct;
}

interface StateProps {
  total: number;
}

const mapStateToProps = (state: ReduxState, { product }: OwnProps): StateProps => ({
  total: getProductTotalCost(state, product)
})

export default connect(
  mapStateToProps
)(OrderTotalProduct)

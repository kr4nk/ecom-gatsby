import { connect } from 'react-redux'

import { getProducts } from '../../redux/selectors/user-order'

import ProductsOrder from '../common/products-order'

import {
  ReduxState
} from '../../types/common'

import {
  TOrderProducts
} from '../../types/account'

interface StateProps {
  products: TOrderProducts;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  products: getProducts(state)
})

export default connect(
  mapStateToProps
)(ProductsOrder)

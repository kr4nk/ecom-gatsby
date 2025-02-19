import { connect } from 'react-redux'

import { getCartIds } from '../../redux/selectors/user-cart'
import { getProductsItems } from '../../redux/selectors/user-products'

import ListCart from '../common/list-cart'

import {
  ReduxState,
  TImmutableIds
} from '../../types/common'

import {
  TProducts
} from '../../types/account'

interface StateProps {
  ids: TImmutableIds;
  products: TProducts;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  ids: getCartIds(state),
  products: getProductsItems(state)
})

export default connect(
  mapStateToProps
)(ListCart)

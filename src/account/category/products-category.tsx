import { connect } from 'react-redux'

import { getProductsItems } from '../../redux/selectors/user-products'

import {
  getCategoryPast,
  getCategoryPageSize
} from '../../redux/selectors/user-categories'

import ProductsCategory from '../common/products-category'

import { ReduxState } from '../../types/common'
import { TProducts } from '../../types/account'

interface StateProps {
  items: TProducts;
  past: number;
  pageSize: number;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  items: getProductsItems(state),
  past: getCategoryPast(state),
  pageSize: getCategoryPageSize(state)
})

export default connect(
  mapStateToProps
)(ProductsCategory)

import { connect } from 'react-redux'

import {
  getIsFetching,
  getSearchText
} from '../../redux/selectors/user-shop'

import {
  getProductsIds,
  getProductsItems
} from '../../redux/selectors/user-products'

import {
  getManufacturersItems
} from '../../redux/selectors/user-manufacturers'

import ProductsSearch from '../common/products-search'

import { TManufacturers, TProducts } from '../../types/account'
import { ReduxState, TImmutableIds } from '../../types/common'

interface StateProps {
  manufacturers: TManufacturers;
  isFetching: boolean;
  search: string;
  items: TProducts;
  list: TImmutableIds;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  manufacturers: getManufacturersItems(state),
  isFetching: getIsFetching(state),
  search: getSearchText(state),
  items: getProductsItems(state),
  list: getProductsIds(state)
})

export default connect(
  mapStateToProps
)(ProductsSearch)

import { connect } from 'react-redux'

import {
  getIsFetching,
  getProductsPast,
  getProductsPageSize
} from '../../redux/selectors/user-shop'

import {
  getProductsIds,
  getProductsItems
} from '../../redux/selectors/user-products'

import { paginationToBegin } from '../../redux/actions/fields'

import ProductsShop from '../common/products-shop'

import {
  TProducts
} from '../../types/account'

import {
  ReduxState,
  Dispatch,
  TImmutableIds
} from '../../types/common'

interface StateProps {
  isFetching: boolean;
  ids: TImmutableIds;
  items: TProducts;
  past: number;
  pageSize: number;
}

interface DispatchProps {
  toBegin (): void;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  isFetching: getIsFetching(state),
  ids: getProductsIds(state),
  items: getProductsItems(state),
  past: getProductsPast(state),
  pageSize: getProductsPageSize(state)
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toBegin (): void {
    dispatch(
      paginationToBegin({
        path: ['userShop']
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsShop)

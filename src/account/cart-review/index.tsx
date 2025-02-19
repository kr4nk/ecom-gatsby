import * as React from 'react'
import { connect } from 'react-redux'

import { getCartIds } from '../../redux/selectors/user-cart'
import { checkIsProductsLoaded } from '../../redux/selectors/user-products'

import { getIsFetching } from '../../redux/selectors/user-shop'

import ContentCartReview from './content-cart-review'
import Empty from '../common/empty'

import Spinner from '../../components/common/spinner'

import { ReduxState, TImmutableIds } from '../../types/common'

interface StateProps {
  ids: TImmutableIds;
  isFetching: boolean;
  isProductsLoaded: boolean;
}

function CartReview ({ ids, isFetching, isProductsLoaded }: StateProps): JSX.Element {
  return isFetching
    ? (<Spinner />)
    : (
      (
        isProductsLoaded &&
        ids.size > 0
      )
        ? <ContentCartReview />
        : <Empty />
    )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  ids: getCartIds(state),
  isFetching: getIsFetching(state),
  isProductsLoaded: checkIsProductsLoaded(state)
})

export default connect(
  mapStateToProps
)(CartReview)

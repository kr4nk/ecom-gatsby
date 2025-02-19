import * as React from 'react'
import { connect } from 'react-redux'

import { getCartIds } from '../../redux/selectors/user-cart'
import { getIsFetching } from '../../redux/selectors/user-shop'
import { checkIsProductsLoaded } from '../../redux/selectors/user-products'

import ContentCart from './content-cart'
import Empty from '../common/empty'

import Spinner from '../../components/common/spinner'

import { ReduxState, TImmutableIds } from '../../types/common'

interface StateProps {
  isFetching: boolean;
  isProductsLoaded: boolean;
  ids: TImmutableIds;
}

const UserCart = ({ ids, isFetching, isProductsLoaded }: StateProps): JSX.Element => {
  if (isFetching) {
    return (<Spinner />)
  }

  if (
    isProductsLoaded &&
    ids.size > 0
  ) {
    return (
      <ContentCart />
    )
  }

  return (
    <Empty />
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  ids: getCartIds(state),
  isFetching: getIsFetching(state),
  isProductsLoaded: checkIsProductsLoaded(state)
})

export default connect(
  mapStateToProps
)(UserCart)

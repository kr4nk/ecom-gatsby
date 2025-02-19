import * as React from 'react'
import { connect } from 'react-redux'

import { getProductBySlug } from '../../redux/selectors/user-products'

import BreadcrumbsProduct from './breadcrumbs-product'

import ContentProduct from '../product/content-product'
import Spinner from '../../components/common/spinner'

import { ReduxState } from '../../types/common'
import { TProduct } from '../../types/account'

interface StateProps {
  product: TProduct | undefined;
}

interface OwnProps {
  slug: string;
}

const ContainerProduct = ({ product }: StateProps): JSX.Element => {
  return product !== undefined
    ? (
      <>
        <BreadcrumbsProduct
          product={product}
        />

        <ContentProduct
          product={product}
        />
      </>
    )
    : <Spinner />
}

const mapStateToProps = (state: ReduxState, { slug }: OwnProps): StateProps => ({
  product: getProductBySlug(state, slug)
})

export default connect(
  mapStateToProps
)(ContainerProduct)

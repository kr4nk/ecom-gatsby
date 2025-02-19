import { connect } from 'react-redux'

import { getProductBySlug } from '../../redux/selectors/user-products'

import ContainerProduct from '../common/container-product'

import { ReduxState } from '../../types/common'
import { TProduct } from '../../types/account'

interface OwnProps {
  slug: string;
}

interface StateProps {
  product: TProduct;
}

const mapStateToProps = (state: ReduxState, { slug }: OwnProps): StateProps => ({
  product: getProductBySlug(state, slug)
})

export default connect(
  mapStateToProps
)(ContainerProduct)

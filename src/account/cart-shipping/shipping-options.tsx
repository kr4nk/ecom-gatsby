import { connect } from 'react-redux'

import ShippingOptions from '../common/shipping-options'

import { getCartShipping } from '../../redux/selectors/user-cart'

import { ReduxState } from '../../types/common'
import { TCartShipping } from '../../types/account'

interface StateProps {
  shipping: TCartShipping;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  shipping: getCartShipping(state)
})

export default connect(
  mapStateToProps
)(ShippingOptions)

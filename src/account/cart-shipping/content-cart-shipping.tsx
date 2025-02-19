import { connect } from 'react-redux'

import { getCustomAddressAsString, getCartShipping } from '../../redux/selectors/user-cart'

import ContentCartShipping from '../common/content-cart-shipping'

import { ReduxState } from '../../types/common'

import { VALUE } from '../../redux/selector-consts'

interface StateProps {
  shipping: string;
  customAddress: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  shipping: getCartShipping(state).get(VALUE),
  customAddress: getCustomAddressAsString(state)
})

export default connect(
  mapStateToProps
)(ContentCartShipping)

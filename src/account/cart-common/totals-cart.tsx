import { connect } from 'react-redux'

import {
  getCartShipping,
  getProductsTotalCost
} from '../../redux/selectors/user-cart'

import TotalsCart from '../common/totals-cart'

import { ReduxState } from '../../types/common'

import {
  VALUE,
  NAME,
  COST
} from '../../redux/selector-consts'

interface StateProps {
  subtotal: number;
  shipping: string;
  shippingName: string;
  shippingCost: string;
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  subtotal: getProductsTotalCost(state),

  shipping: getCartShipping(state)
    .get(VALUE),

  shippingName: getCartShipping(state)
    .get(NAME),

  shippingCost: getCartShipping(state)
    .get(COST)
})

export default connect(
  mapStateToProps
)(TotalsCart)

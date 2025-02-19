import { connect } from 'react-redux'

import { getOrder } from '../../redux/selectors/user-order'

import ShippingOrder from '../common/shipping-order'

import { ReduxState } from '../../types/common'

import { TShippingAddress } from '../../types/account'

import {
  STATUS,
  SHIPPING,
  SHIPPING_COST,
  ESTIMATE_DELIVERY_DATE,
  SHIPPING_ADDRESS
} from '../../redux/selector-consts'

interface StateProps {
  status: number;
  shipping: string;
  shippingCost: number;
  deliveryDate: string;
  address: TShippingAddress;
}

function mapStateToProps (state: ReduxState): StateProps {
  const order = getOrder(state)

  return {
    status: order.get(STATUS),
    shipping: order.get(SHIPPING),
    shippingCost: order.get(SHIPPING_COST) || 0,
    deliveryDate: order.get(ESTIMATE_DELIVERY_DATE) || '',
    address: order.get(SHIPPING_ADDRESS)
  }
}

export default connect(
  mapStateToProps
)(ShippingOrder)

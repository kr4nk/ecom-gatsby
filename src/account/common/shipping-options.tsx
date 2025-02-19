import * as React from 'react'

import ShippingBusiness from '../cart-shipping/shipping-business'
import ShippingWarehouse from '../cart-shipping/shipping-warehouse'
import ShippingCustom from '../cart-shipping/shipping-custom'

import * as userCart from '../../styles/user-cart.module.css'

import { TCartShipping } from '../../types/account'

import { VALUE } from '../../redux/selector-consts'

interface StateProps {
  shipping: TCartShipping;
}

const ShippingOptions = ({ shipping }: StateProps): JSX.Element => (
  <ul className={userCart.cartShipping}>
    <ShippingBusiness
      name='Delivery to your business address'
      type='business'
      selected={shipping.get(VALUE) === 'business'}
      params={shipping}
    />

    <ShippingWarehouse
      name='Pick up at warehouse'
      type='pickup'
      selected={shipping.get(VALUE) === 'pickup'}
      params={shipping}
    />

    <ShippingCustom
      name='Send to custom address'
      type='custom'
      selected={shipping.get(VALUE) === 'custom'}
      params={shipping}
    />
  </ul>
)

export default ShippingOptions

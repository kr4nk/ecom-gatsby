import * as React from 'react'

import Steps from './steps'
import MessageFreeShipping from './message-free-shipping'

import ControlsCart from '../cart-shipping/controls-cart'
import ActionsCart from '../common/actions-cart'
import ShippingOptions from '../cart-shipping/shipping-options'

import TotalsCart from '../cart-common/totals-cart'

import * as layout from '../../styles/layout.module.css'

interface StateProps {
  shipping: string;
  customAddress: string;
}

const ContentCartShipping = ({ shipping, customAddress }: StateProps): JSX.Element => (
  <div className={layout.container}>
    <ControlsCart
      prev='Cart'
      next='Review Order'
      prevPath='/account/cart'
      nextPath='/account/cart/review'
      disabled={
        shipping === 'none' || (
          shipping === 'custom' &&
          customAddress.length === 0
        )
      }
    />

    <div className={layout.content}>
      <h1 className={layout.sectionTitle}>
        Choose Shipping Option
      </h1>

      <section className={layout.section}>
        <Steps step={2} />

        <ActionsCart />

        <MessageFreeShipping />

        <ShippingOptions />

        <TotalsCart />
      </section>
    </div>

    <ControlsCart
      prev='Cart'
      next='Review Order'
      prevPath='/account/cart'
      nextPath='/account/cart/review'
      disabled={
        shipping === 'none' || (
          shipping === 'custom' &&
          customAddress.length === 0
        )
      }
    />
  </div>
)

export default ContentCartShipping

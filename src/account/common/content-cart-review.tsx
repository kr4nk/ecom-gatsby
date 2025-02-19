import * as React from 'react'

import Steps from './steps'
import MessageFreeShipping from './message-free-shipping'

import ControlsCart from '../cart-review/controls-cart'
import ActionsCart from '../common/actions-cart'

import ListCart from '../cart-common/list-cart'
import TotalsCart from '../cart-common/totals-cart'

import * as layout from '../../styles/layout.module.css'

interface StateProps {
  disabled: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ContentCartReview = ({ disabled, onClick }: StateProps & DispatchProps): JSX.Element => (
  <div className={layout.container}>
    <ControlsCart
      prev='Shipping'
      next='Place Order'
      prevPath='/account/cart/shipping'
      nextPath='/account/thanks'
      disabled={disabled}
      nextClick={onClick}
    />

    <div className={layout.content}>
      <h1 className={layout.sectionTitle}>
        Review Your Order
      </h1>

      <section className={layout.section}>
        <Steps step={3} />

        <ActionsCart />

        <MessageFreeShipping />

        <ListCart />

        <TotalsCart />
      </section>
    </div>

    <ControlsCart
      prev='Shipping'
      next='Place Order'
      prevPath='/account/cart/shipping'
      nextPath='/account/thanks'
      disabled={disabled}
      nextClick={onClick}
    />
  </div>
)

export default ContentCartReview

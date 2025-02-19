import * as React from 'react'

import ControlsCart from '../cart/controls-cart'
import ActionsCart from '../common/actions-cart'

import Steps from './steps'
import MessageFreeShipping from './message-free-shipping'

import ListCart from '../cart-common/list-cart'
import TotalsCart from '../cart-common/totals-cart'

import Spinner from '../../components/common/spinner'

import * as layout from '../../styles/layout.module.css'

interface OwnProps {
  disabled: boolean;
}

const ContentCart = ({ disabled }: OwnProps): JSX.Element => (
  <div className={layout.container}>
    <ControlsCart
      prev='Shop'
      next='Proceed to Shipping'
      prevPath='/account'
      nextPath='/account/cart/shipping'
    />

    <div className={layout.content}>
      <h1 className={layout.sectionTitle}>
        Your Cart
      </h1>

      <section className={layout.section}>
        {
          // eslint-disable-next-line @getify/proper-arrows/return
          disabled
            ? (
              <Spinner />
            )
            : (
              <>
                <ActionsCart />

                <Steps step={1} />

                <MessageFreeShipping />

                <ListCart />

                <TotalsCart />
              </>
            )
        }
      </section>
    </div>

    <ControlsCart
      prev='Shop'
      next='Proceed to Shipping'
      prevPath='/account'
      nextPath='/account/cart/shipping'
    />
  </div>
)

export default ContentCart

import * as React from 'react'
import classnames from 'classnames'

import * as userCart from '../../styles/user-cart.module.css'

interface StateProps {
  shipping: string;
  shippingName: string;
  shippingCost: string;
  subtotal: number;
}

const TotalsCart = ({
  subtotal,
  shipping,
  shippingName,
  // eslint-disable-next-line @getify/proper-arrows/params
  shippingCost
}: StateProps): JSX.Element => (
  <div className={userCart.cartSummary}>
    <div
      className={
        classnames(
          userCart.itemSummary,
          userCart.itemSummarySubtotal
        )
      }
    >
      <div>
        Subtotal
      </div>

      <div>
        {
          new Intl.NumberFormat(
            'en-US', {
              style: 'currency',
              currency: 'USD'
            }
          ).format(subtotal)
        }
      </div>
    </div>

    <div
      className={
        classnames(
          userCart.itemSummary,
          userCart.itemSummaryShipping
        )
      }
    >
      <div>
        Shipping:&nbsp;

        <span className={userCart.itemShippingName}>
          { shippingName }
        </span>

        {
          shipping !== 'pickup' && (
            <div className={userCart.leftToFreeShipping}>
              {
                subtotal > 4500
                  ? 'Your have got FREE shipping!'
                  : `Only ${
                    new Intl
                      .NumberFormat(
                        'en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(
                        4500 - subtotal
                      )
                  } left for free shipping.`
              }
            </div>
          )
        }
      </div>

      {
        // eslint-disable-next-line @getify/proper-arrows/return
        (
          subtotal < 4500 &&
          shipping !== 'pickup'
        )
          ? (
            <div>
              {
                shippingCost // Free or Calculate: type of string
              }
            </div>
          )
          : (
            <div className={userCart.freeShipping}>
              FREE
            </div>
          )
      }
    </div>
  </div>
)

export default TotalsCart

import * as React from 'react'
import classnames from 'classnames'

import CustomAddress from '../cart-shipping/custom-address'

import * as userCart from '../../styles/user-cart.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  subtotal: number;
  name: string;
  cost: string;
  address: string;
  selected: boolean;
  onClick: React.MouseEventHandler;
}

const ShippingCustom = ({
  subtotal,
  name,
  cost,
  // eslint-disable-next-line @getify/proper-arrows/params
  address,
  selected,
  onClick
}: OwnProps): JSX.Element => (
  <li className={userCart.itemShippingCart}>
    <button
      className={
        classnames(
          userCart.buttonShippingOption,
          utility.full,
          utility.tal
        )
      }
      onClick={onClick}
      type='button'
    >
      <div
        className={
          classnames(
            userCart.itemShippingHeader,
            utility.df,
            utility.jcsb,
            utility.aic
          )
        }
      >
        <div
          className={
            classnames(
              userCart.shippingVariantGroup,
              utility.df,
              utility.aic
            )
          }
        >
          <div
            className={
              classnames(
                userCart.shippingVariantStatus,
                utility.pen
              )
            }
          >
            <div
              className={
                classnames(
                  userCart.shippingVariantBullet, {
                    [userCart.shippingVariantBulletSelected]: selected
                  }
                )
              }
            />
          </div>

          <div
            className={
              classnames(
                userCart.itemShippingTitle, {
                  [utility.bold]: selected
                }
              )
            }
          >
            {name}
          </div>
        </div>

        <div
          className={
            classnames(
              userCart.itemShippingCost, {
                [userCart.freeShipping]: subtotal > 4500
              }
            )
          }
        >
          {
            // eslint-disable-next-line @getify/proper-arrows/return
            subtotal > 4500
              ? 'FREE'
              : cost
          }
        </div>
      </div>

      {
        address && (
          <div className={userCart.itemShippingDetails}>
            {address}
          </div>
        )
      }
    </button>

    {
      selected && (
        <div className={userCart.itemShippingOptions}>
          <CustomAddress />
        </div>
      )
    }
  </li>
)

export default ShippingCustom

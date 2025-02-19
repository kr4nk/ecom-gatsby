import * as React from 'react'
import classnames from 'classnames'

import * as userCart from '../../styles/user-cart.module.css'
import * as utility from '../../styles/utility.module.css'

interface StateProps {
  subtotal: number;
  name: string;
  cost: string;
  address?: string;
  selected: boolean;
}

interface DispatchProps {
  onClick: React.MouseEventHandler;
}

const ShippingBusiness = ({
  subtotal,
  name,
  cost,
  // eslint-disable-next-line @getify/proper-arrows/params
  address,
  selected,
  onClick
}: StateProps & DispatchProps): JSX.Element => (
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
            { name }
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
            { address }
          </div>
        )
      }
    </button>
  </li>
)

export default ShippingBusiness

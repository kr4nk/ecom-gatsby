import * as React from 'react'
import classnames from 'classnames'

import ComboboxWarehouseUs from '../cart-common/combobox-warehouse-us'
import CheckboxToCustom from '../cart-common/checkbox-to-custom'
import CustomAddress from '../cart-shipping/custom-address'

import * as userCart from '../../styles/user-cart.module.css'
import * as grid from '../../styles/grid.module.css'
import * as utility from '../../styles/utility.module.css'

import { TWarehouse } from '../../types/account'

import {
  NAME,
  PHONE,
  ADDRESS,
  CITY,
  STATE,
  ZIP,
  POST_OFFICE_BOX
} from '../../redux/selector-consts'

interface OwnProps {
  name: string;
  isToCustom: boolean;
  selected: boolean;
  warehouse?: TWarehouse;
  onClick: React.MouseEventHandler;
}

export default function ShippingWarehouse ({
  name,
  warehouse,
  isToCustom,
  selected,
  onClick
}: OwnProps): JSX.Element {
  return (
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
                userCart.itemShippingCost,
                userCart.freeShipping
              )
            }
          >
            FREE
          </div>
        </div>

        {
          warehouse !== undefined && (
            <div className={userCart.itemShippingDetails}>
              <p>
                Name: {warehouse.get(NAME)}
              </p>

              <p>
                Phone: {warehouse.get(PHONE)}
              </p>

              <p>
                Address: {warehouse.get(ADDRESS)}
              </p>

              <p>
                City: {warehouse.get(CITY)}
              </p>

              <p>
                State: {warehouse.get(STATE)}
              </p>

              <p>
                Zip: {warehouse.get(ZIP)}
              </p>

              {
                warehouse.has(POST_OFFICE_BOX) && (
                  <p>
                    PO Box: {warehouse.get(POST_OFFICE_BOX)}
                  </p>
                )
              }
            </div>
          )
        }
      </button>

      {
        selected && (
          <div className={userCart.itemShippingOptions}>
            <div className={grid.row}>
              <ComboboxWarehouseUs />
            </div>

            <div className={grid.row}>
              <CheckboxToCustom />
            </div>

            {
              isToCustom && (
                <CustomAddress />
              )
            }
          </div>
        )
      }
    </li>
  )
}

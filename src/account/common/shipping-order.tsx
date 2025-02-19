import * as React from 'react'
import classnames from 'classnames'

import { ORDER_PENDING } from '../../const/orders'

import * as fields from '../../styles/fields.module.css'
import * as grid from '../../styles/grid.module.css'

import { TShippingAddress } from '../../types/account'

import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  COUNTRY,
  STATE,
  CITY,
  ZIP
} from '../../redux/selector-consts'

interface StateProps {
  status: number;
  shipping: string;
  shippingCost: number;
  deliveryDate: string;
  address: TShippingAddress;
}

const ShippingOrder = ({
  shipping,
  shippingCost,
  deliveryDate,
  // eslint-disable-next-line @getify/proper-arrows/params
  address,
  status
}: StateProps): JSX.Element => (
  <div
    className={
      classnames(
        fields.fieldSet,
        grid.row
      )
    }
  >
    {
      status !== ORDER_PENDING && shippingCost !== undefined && (
        <>
          <div
            className={
              classnames(
                fields.field,
                grid.colMd2
              )
            }
          >
            Method

            <div className={fields.text}>
              { shipping }
            </div>
          </div>

          <div
            className={
              classnames(
                fields.field,
                grid.colMd1
              )
            }
          >
            Cost

            <div className={fields.text}>
              {
                // eslint-disable-next-line @getify/proper-arrows/return
                shippingCost === 0
                  ? 'Free'
                  : new Intl.NumberFormat(
                    'en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }
                  ).format(
                    shippingCost
                  )
              }
            </div>
          </div>

          <div
            className={
              classnames(
                fields.field,
                grid.colMd1
              )
            }
          >
            Estimate delivery

            <div className={fields.text}>
              { deliveryDate }
            </div>
          </div>
        </>
      )
    }

    <div
      className={
        classnames(
          fields.field,
          grid.colMd2
        )
      }
    >
      Address Line 1

      <div className={fields.text}>
        { address.get(ADDRESS_LINE_1) }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd2
        )
      }
    >
      Address Line 2

      <div className={fields.text}>
        { address.get(ADDRESS_LINE_2) || '—' }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd1
        )
      }
    >
      Country

      <div className={fields.text}>
        { address.get(COUNTRY) }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd1
        )
      }
    >
      State

      <div className={fields.text}>
        { address.get(STATE) }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd1
        )
      }
    >
      City

      <div className={fields.text}>
        { address.get(CITY) }
      </div>
    </div>

    <div
      className={
        classnames(
          fields.field,
          grid.colMd1
        )
      }
    >
      ZipCode

      <div className={fields.text}>
        { address.get(ZIP) }
      </div>
    </div>
  </div>
)

export default ShippingOrder

import * as React from 'react'
import classnames from 'classnames'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'
import { TOrder } from '../../types/account'

import {
  SHIPPING_COST,
  PRODUCTS_COST,
  STATE,
  STATE_TAX,
  TAXES_VALUE,
  COUNTY_TAX,
  COUNTY,
  COUNTY_TAX_VALUE,
  TOTAL_COST
} from '../../redux/selector-consts'

interface StateProps {
  order: TOrder;
}

const SummaryOrder = ({ order }: StateProps): JSX.Element => (
  <div className={managerOrder.listSummary}>
    <div
      className={
        classnames(
          managerOrder.itemSummary,
          managerOrder.itemSummarySubtotal,
          utility.df,
          utility.jcsb,
          utility.aic
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
          ).format(
            order.get(PRODUCTS_COST)
          )
        }
      </div>
    </div>

    {
      (
        order.get(SHIPPING_COST) as number > 0
      ) && (
        <div
          className={
            classnames(
              managerOrder.itemSummary,
              managerOrder.itemSummaryShipping,
              utility.df,
              utility.jcsb,
              utility.aic
            )
          }
        >
          <div>
            Shipping
          </div>

          <div>
            {
              // eslint-disable-next-line @getify/proper-arrows/return
              order.get(PRODUCTS_COST) > 4500
                ? 'FREE'
                : new Intl.NumberFormat(
                  'en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }
                ).format(
                  order.get(SHIPPING_COST) as number
                )
            }
          </div>
        </div>
      )
    }

    {
      (order.get(TAXES_VALUE) as number) > 0 && (
        <div
          className={
            classnames(
              managerOrder.itemSummary,
              managerOrder.itemSummaryTax,
              utility.df,
              utility.jcsb,
              utility.aic
            )
          }
        >
          <div>
            { order.get(STATE) } State Tax { order.get(STATE_TAX) }%
          </div>

          <div>
            {
              new Intl.NumberFormat(
                'en-US', {
                  style: 'currency',
                  currency: 'USD'
                }
              ).format(
                order.get(TAXES_VALUE) as number
              )
            }
          </div>
        </div>
      )
    }

    {
      (order.get(COUNTY_TAX) as number) > 0 && (
        <div
          className={
            classnames(
              managerOrder.itemSummary,
              managerOrder.itemSummaryTax,
              utility.df,
              utility.jcsb,
              utility.aic
            )
          }
        >
          <div>
            { order.get(COUNTY) } County Tax { order.get(COUNTY_TAX) }%
          </div>

          <div>
            {
              new Intl.NumberFormat(
                'en-US', {
                  style: 'currency',
                  currency: 'USD'
                }
              ).format(
                order.get(COUNTY_TAX_VALUE) as number
              )
            }
          </div>
        </div>
      )
    }

    <div
      className={
        classnames(
          managerOrder.itemSummary,
          managerOrder.itemSummaryTotal,
          utility.df,
          utility.jcsb,
          utility.aibl,
          utility.bold
        )
      }
    >
      <div>
        Order Total
      </div>

      <div className={managerOrder.orderTotal}>
        {
          new Intl.NumberFormat(
            'en-US', {
              style: 'currency',
              currency: 'USD'
            }
          ).format(
            order.get(TOTAL_COST)
          )
        }
      </div>
    </div>
  </div>
)

export default SummaryOrder

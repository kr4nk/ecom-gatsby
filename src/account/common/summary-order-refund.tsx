import * as React from 'react'
import classnames from 'classnames'

import * as managerOrder from '../../styles/manager-order.module.css'
import * as utility from '../../styles/utility.module.css'

interface StateProps {
  productsCost: number;
  taxesValue: number;
  totalCost: number;
}

const SummaryOrderRefund = ({ productsCost, taxesValue, totalCost }: StateProps): JSX.Element => (
  <div
    className={
      classnames(
        managerOrder.listSummary,
        utility.full
      )
    }
  >
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
          ).format(productsCost)
        }
      </div>
    </div>

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
        Shipping
      </div>

      <div>
        No refund
      </div>
    </div>

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
        Taxes
      </div>

      <div>
        {
          new Intl.NumberFormat(
            'en-US', {
              style: 'currency',
              currency: 'USD'
            }
          ).format(taxesValue)
        }
      </div>
    </div>

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
        Refund Total
      </div>

      <div className={managerOrder.orderTotal}>
        {
          new Intl.NumberFormat(
            'en-US', {
              style: 'currency',
              currency: 'USD'
            }
          ).format(totalCost)
        }
      </div>
    </div>
  </div>
)

export default SummaryOrderRefund

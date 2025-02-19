import * as React from 'react'
import classnames from 'classnames'

import PaymentWireInfo from '../order/payment-wire-info'

import ButtonAcceptOrder from '../order/button-accept-order'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'
import * as utility from '../../styles/utility.module.css'

const PaymentWireForm = (): JSX.Element => (
  <div className={fields.fieldSet}>
    <PaymentWireInfo />

    <p
      className={
        classnames(
          utility.grayDark,
          utility.mt12
        )
      }
    >
      Make a payment on the specified details yourself. Wait for the manager to confirm receipt of payment.
    </p>

    <div
      className={
        classnames(
          grid.row,
          fields.field,
          grid.colMd1
        )
      }
    >
      <ButtonAcceptOrder />
    </div>
  </div>
)

export default PaymentWireForm

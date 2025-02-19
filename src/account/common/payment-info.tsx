import * as React from 'react'

import { getPaymentName } from '../../const/payment'

import PaymentWireInfo from '../order/payment-wire-info'

import * as fields from '../../styles/fields.module.css'

interface StateProps {
  payment: string;
}

const PaymentInfo = ({ payment }: StateProps): JSX.Element => (
  <div className={fields.field}>
    Method

    <div className={fields.text}>
      {
        payment
          ? getPaymentName(payment)
          : 'Not selected'
      }
    </div>

    {
      // eslint-disable-next-line @getify/proper-arrows/return
      payment === 'wire-transfer'
        ? (<PaymentWireInfo />)
        : (<></>)
    }
  </div>
)

export default PaymentInfo

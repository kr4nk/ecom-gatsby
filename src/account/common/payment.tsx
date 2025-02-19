import * as React from 'react'

import {
  PAYMENT_WIRE,
  PAYMENT_CARD
} from '../../const/payment'

import PaymentWire from '../order/payment-wire'
import PaymentCard from '../order/payment-card'

import * as userOrder from '../../styles/user-order.module.css'

import { TImmutableInput } from '../../types/common'

import { VALUE } from '../../redux/selector-consts'

interface OwnProps {
  method: TImmutableInput;
}

const Payment = ({ method }: OwnProps): JSX.Element => (
  <div>
    <ul className={userOrder.userPayment}>
      <PaymentWire
        selected={method.get(VALUE) === PAYMENT_WIRE}
        type={PAYMENT_WIRE}
        params={method}
      />

      <PaymentCard
        selected={method.get(VALUE) === PAYMENT_CARD}
        type={PAYMENT_CARD}
        params={method}
      />
    </ul>
  </div>
)

export default Payment

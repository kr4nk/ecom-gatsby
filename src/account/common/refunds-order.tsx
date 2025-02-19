import * as React from 'react'

import Refund from '../order-refund'

import { TOrderRefunds } from '../../types/account'

import { ID } from '../../redux/selector-consts'

interface StateProps {
  refunds: TOrderRefunds;
}

const RefundOrders = ({ refunds }: StateProps): JSX.Element => (
  <ul>
    {
      refunds.map(function mapper (refund, index): JSX.Element {
        return (
          <Refund
            key={refund.get(ID)}
            index={index}
          />
        )
      })
    }
  </ul>
)

export default RefundOrders

import * as React from 'react'
import classnames from 'classnames'

import InputCardFullName from '../order/input-card-name'
import InputCardNumber from '../order/input-card-number'
import InputCardExpDate from '../order/input-card-exp-date'
import InputCardCvv from '../order/input-card-cvv'
import ButtonPayNow from '../order/button-pay-now'

import * as grid from '../../styles/grid.module.css'
import * as fields from '../../styles/fields.module.css'

interface OwnProps {
  onSubmit: React.FormEventHandler;
}

const PaymentCardForm = ({ onSubmit }: OwnProps): JSX.Element => (
  <form onSubmit={onSubmit}>
    <div
      className={
        classnames(
          fields.fieldSet,
          grid.row
        )
      }
    >
      <InputCardFullName />

      <InputCardNumber />

      <InputCardExpDate />

      <InputCardCvv />

      <div
        className={
          classnames(
            fields.field,
            grid.colMd2
          )
        }
      >
        <ButtonPayNow />
      </div>
    </div>
  </form>
)

export default PaymentCardForm

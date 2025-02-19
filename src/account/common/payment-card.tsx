import * as React from 'react'
import classnames from 'classnames'

import PaymentCardForm from '../order/payment-card-form'

import * as radio from '../../styles/radio.module.css'
import * as userOrder from '../../styles/user-order.module.css'
import * as utility from '../../styles/utility.module.css'

interface OwnProps {
  onClick: React.MouseEventHandler;
  selected: boolean;
}

const PaymentCard = ({ selected, onClick }: OwnProps): JSX.Element => (
  <li className={radio.radioListItem}>
    <button
      className={
        classnames(
          radio.radioButton,
          utility.tal
        )
      }
      onClick={onClick}
      type='button'
    >
      <div
        className={
          classnames(
            utility.df,
            utility.aic
          )
        }
      >
        <div
          className={
            classnames(
              radio.radioBullet,
              utility.pen
            )
          }
        >
          <div
            className={
              classnames(
                radio.radioMarker, {
                  [radio.radioMarkerSelected]: selected
                }
              )
            }
          />
        </div>

        <div
          className={
            classnames(
              radio.radioListItemTitle, {
                [utility.bold]: selected
              }
            )
          }
        >
          Credit Card
        </div>
      </div>
    </button>

    {
      selected && (
        <div className={userOrder.creditCardForm}>
          <PaymentCardForm />
        </div>
      )
    }
  </li>
)

export default PaymentCard
